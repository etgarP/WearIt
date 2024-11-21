const Order = require('../../models/Order');
const Design = require('../../models/desinger/Design');
const ClientInfo = require('../../models/client/ClientInfo');
const path = require('path');
const fs = require('fs');
const { getClientImage } = require('../../services/Client/ClientInfoService')

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
            await order.save(); // Persist the changes to the database
        }
    }

    return orders;
};

/*  
    input: order id
    output: gets order by order id 
*/
const getOrderDetails = async (orderId) => {
    const order = await Order.findById(orderId);
    const clientInfo = await ClientInfo.find({username: order.username})
    const design = await Design.find({orderId})
    return { clientInfo, design };
};

/*  
    input: order id, design
    output: None.
    saves order as in diferent status
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
    input: design
    output: None
    save the current design
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
    // First find the order and check ownership
    const order = await Order.findOne({
        _id: orderId,
        designer: designer
    });

    return order != null
};

const getDesignString = (relativePath) => {
    const fullPath = path.join(__dirname, relativePath);
    const imageBuffer = fs.readFileSync(fullPath);
    const base64Image = imageBuffer.toString('base64');
    return `data:image/png;base64,${base64Image}`;
};

const addDesignEntry = async ( orderId, newUrl) => {
    // Find the existing design document
    const design = await Design.findOne({ orderId });
    if (!design) {
        throw new Error('Design not found for the given orderId');
    }
    
    // Check if the newUrl already exists in the items array
    const urlExists = design.items.some(item => item.url === newUrl);
    if (urlExists) {
        console.log('URL already exists in the design items.');
        return design; // Return the existing design without modifying it
    }
    // Create the new design entry
    const newDesignEntry = {
        url: newUrl,
        imageOfCloth: getDesignString("./cloth.png"),
        typeOfCloth: 'shirt' // Default type, can be modified as needed
    };
    // Add the new entry to the items array
    design.items.push(newDesignEntry);
    // Save the updated design document
    const updatedDesign = await design.save();
    return updatedDesign;
};

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

const notAbleToAdd = async (orderId) => {
    const design = await Design.findOne({ orderId })
    if (!design || design.items.length < 100 || design.status =='finished') {
        return false
    }
    return true
}

const notAbleToRemove = async (orderId) => {
    const design = await Design.findOne({ orderId })
    if (!design || design.status == 'finished') {
        return false
    }
    return true
}

module.exports = { notAbleToAdd, notAbleToRemove, getOrders, itemsDelivered, removeDesignEntry, newDesign, addDesignEntry, isDesignerInOrder, getOrderDetails, acceptOrder, rejectOrder, sendOrder };
