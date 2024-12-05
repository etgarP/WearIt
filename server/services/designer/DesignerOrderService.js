const Order = require('../../models/Order');
const Design = require('../../models/desinger/Design');
const ClientInfo = require('../../models/client/ClientInfo');
const path = require('path');
const fs = require('fs');
const { getClientImage } = require('../../services/Client/ClientInfoService')
const { getDesignerImage } = require('../../services/Designer/DesignerProfileService')
const ClientOrderService = require('../Client/ClientOrderService')

/*  
    input: username
    output: all the orders for the designer
*/
const getOrders = async (username) => {
    const orders = await Order.find({ designer: username });

    // Update and save the clientImage for each order
    for (const order of orders) {
        if (order.username) {
            order.clientImage = await getClientImage(order.username);
            order.designerImage = await getDesignerImage(order.designer);
            await order.save(); // Persist the changes to the database
        }
    }

    return orders;
};

/*  
    input: order id
    output: clientInfo, design for the order
*/
const getOrderDetails = async (orderId) => {
    const order = await Order.findById(orderId);
    const clientInfo = await ClientInfo.find({username: order.username})
    const design = await Design.find({orderId})
    return { clientInfo, design };
};

/*  
    input: order id
    output: None.
    saves order as finished
*/
const sendOrder = async (orderId) => {
    const order = await Order.findById(orderId);
    if (order) {
        order.status = 'finished';
        await order.save();
        return true
    }
    return false
};

/*  
    input: order id
    output: None.
    accept a pending order
*/

const acceptOrder = async (orderId) => {
    const order = await Order.findById(orderId);
    if (order && order.status == 'pending') {
        order.status = 'accepted';
        await order.save();
        return true
    }
    return false
};

/*  
    input: orderId
    output: None
    create a design
*/
const newDesign = async (orderId) => {
    const order = await Order.findById(orderId);
    if (!order) {
        console.log('Order not found')
        throw new Error('Order not found');
    }
    if (order.status !== 'finished') {
        await Design.findOneAndUpdate(
            { orderId },
            { orderId, items: [] }, // new: true returns the updated document and set, upsert inserts if not there
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        return true
    }
    return false
};



/*  
    input: order id
    output: None.
    rejects a pending order
*/
const rejectOrder = async (orderId) => {
    const order = await Order.findById(orderId);
    if (order && order.status == 'pending') {
        order.status = 'rejected';
        await order.save();
        return true
    }
    return false
};

/*  
    input: username, orderId
    output: if the username is the client in that order
*/
const isDesignerInOrder = async (orderId, designer) => {
    console.log(orderId,designer)
    // First find the order and check ownership
    const order = await Order.findOne({
        _id: orderId,
        designer: designer
    });

    return order != null
};

// takes a path and return the file as a base64 image
const getDesignString = (relativePath) => {
    const fullPath = path.join(__dirname, relativePath);
    const imageBuffer = fs.readFileSync(fullPath);
    const base64Image = imageBuffer.toString('base64');
    return `data:image/png;base64,${base64Image}`;
};

const { spawn } = require('child_process');

// runs a python file with optional args
const runPythonScript = async (scriptPath, args = []) => {
    return new Promise((resolve, reject) => {
        const absolutePath = path.resolve(scriptPath); // Ensure correct path format
        const pythonProcess = spawn('python3', [absolutePath, ...args]);

        let stdout = '';
        let stderr = '';

        pythonProcess.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                resolve(stdout);
            } else {
                reject(new Error(`Python script exited with code ${code}:\n${stderr}`));
            }
        });

        pythonProcess.on('error', (error) => {
            reject(error);
        });
    });
};

/*
    input: orderId, url, type of outfit(shirt or otherwise)
    output: new design with added url and scraped image from everlane website
*/
const addDesignEntry = async (orderId, newUrl, typeOfOutfit) => {
    // Find the existing design document
    const design = await Design.findOne({ orderId });
    if (!design) {
        throw new Error('Design not found for the given orderId');
    }
    const scriptPath = path.resolve(__dirname, '..', '..', 'scraping', 'scrape.py');
    // Check if the newUrl already exists in the items array
    const urlExists = design.items.some(item => item.url === newUrl);
    if (urlExists) {
        console.log('URL already exists in the design items.');
        return design; // Return the existing design without modifying it
    }
    await runPythonScript(scriptPath, [newUrl]);
    console.log(typeOfOutfit)
    // Create the new design entry
    const newDesignEntry = {
        url: newUrl,
        imageOfCloth: getDesignString("../../scraping/downloaded_images/last_image.jpg"),
        typeOfCloth: typeOfOutfit == 'shirt' ? 'shirt' : 'other'
    };
    // Add the new entry to the items array
    design.items.push(newDesignEntry);
    // Save the updated design document
    const updatedDesign = await design.save();
    return updatedDesign;
};

/*
    input: orderId, urlToRemove
    output: new design without url item
*/
const removeDesignEntry = async (orderId, urlToRemove) => {
    // Find the existing design document
    const design = await Design.findOne({ orderId });
    if (!design) {
        throw new Error('Design not found for the given orderId');
    }

    // Filter out the design entry with the given URL
    const filteredItems = design.items.filter(item => item.url !== urlToRemove);

    // Check if any entry was removed
    if (filteredItems.length === design.items.length) {
        throw new Error('Design entry not found for the given URL');
    }

    // Update the items array
    design.items = filteredItems;

    // Save the updated design document
    const updatedDesign = await design.save();
    return updatedDesign;
};

// checks if at least the number of design items were added
const itemsDelivered = async (orderId) => {
    const order = await Order.findOne({
        _id: orderId,
    });
    const design = await Design.findOne({orderId})
    if (order && design && order.numberOfOutfits <= design.items.length) {
        return true
    } 
    return false
}

// check if more then 100 items were added or the design is already sent
const notAbleToAdd = async (orderId) => {
    const design = await Design.findOne({ orderId })
    if (!design || design.items.length < 100 || design.status =='finished') {
        return false
    }
    return true
}

// checks if the design is finished
const notAbleToRemove = async (orderId) => {
    const design = await Design.findOne({ orderId })
    if (!design || design.status == 'finished') {
        return true
    }
    return false
}


/*
    input: orderId, url, type(of clothes), username
    tries the outfit on the on the client 
    returns the updated design
*/
const tryOn = async (orderId, url, username, q) => {
    if (!await isDesignerInOrder(orderId, username)) {
        throw new Error('Order not found or unauthorized access');
    }

    // Ensure orderId is a valid ObjectId
    const order = await Order.findOne({_id: orderId})
    if (!order) {
        throw new Error('Design not found for the given orderId');
    }

    return await ClientOrderService.tryOn(orderId, url, order.username, q)
};


module.exports = { tryOn, notAbleToAdd, notAbleToRemove, getOrders, itemsDelivered, removeDesignEntry, newDesign, addDesignEntry, isDesignerInOrder, getOrderDetails, acceptOrder, rejectOrder, sendOrder };
