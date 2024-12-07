const fs = require('fs');
const paths = require('path');
const Order = require('../../models/Order');
const Design = require('../../models/desinger/Design');
const { getClientImage } = require('../../services/Client/ClientInfoService')
const { getDesignerImage } = require('../../services/Designer/DesignerProfileService')
const { Review, DesignerProfile } = require('../../models/desinger/DesignerProfile')

/*  
    input: client username
    output: list of client orders
*/
const getClientOrders = async (username) => {
    try {
        // Find all orders for the specified client username
        const orders = await Order.find({ username });

        // Iterate through each order to check if its status is 'finished'
        const ordersWithReviews = await Promise.all(orders.map(async (order) => {
            if (order.status === 'Finished') {
                // Find the review for the designer made by this user using getReview function
                const review = await getReview(order.designer, order.username);

                // Attach the review to the order if found
                return {
                    ...order.toObject(),
                    review: review || null  // Attach the review or null if not found
                };
            } else {
                return order;
            }
        }));

        return ordersWithReviews;
    } catch (error) {
        console.error('Error fetching client orders:', error);
        throw error;
    }
};


/*  
    input: client username, orderId
    output: if the order exists
*/
const orderIsFinished = async (username, designer) => {
    var finished = await Order.find({ designer, username, status: 'Finished' })
    return finished != null
};

/*  
    input: username, order
    output: none
    adds the order to the database
*/
const purchaseOrder = async (username, order) => {
    image = await getClientImage(username)
    console.log(order.designer)
    image2 ="image"
    // Add the client's image to the order
    const newOrder = new Order({ ...order, username, clientImage: image, designerImage: image2 });

    // Save the order to the database
    const savedOrder = await newOrder.save();
    console.log("Saved Order:", savedOrder); // Check if order is saved
    // Create a corresponding design entry for the new order
    const newDesign = new Design({
        beforeImage: await getClientImage(username),
        orderId: savedOrder._id,
        items: [] // Populate this with initial design entries as needed
    });
    await newDesign.save();    
    return savedOrder;
};

/**
 * get a specific review by a user for a designer.
 * takes: the designers username, reviewers username
 * returns the review object if found, or null if not found
 */
const getReview = async (designerUsername, username) => {
    // Find the designer's profile by their username
    const designerProfile = await DesignerProfile.findOne({ username: designerUsername });

    // If designer profile doesn't exist, return null
    if (!designerProfile) {
        throw new Error('Error fetching designer');
    }

    // Find the review left by the specific user
    const review = designerProfile.reviews.find(r => r.username === username);

    // Return the review if found, else null
    return review || null;
};

/*  
    input: username, orderId
    output: if the username is the client in that order
*/
const isClientInOrder = async (orderId, username) => {
    // First find the order and check ownership
    const order = await Order.findOne({
        _id: orderId,
        username: username
    });

    return order != null
};


/*  
    input: username 
    output: all the designs for the client
    save the current design
*/
const getDesign = async (orderId, username) => {
    if (!isClientInOrder( orderId, username)) {
        throw new Error('Order not found or unauthorized access');
    }
    // Once verified, get the design
    const design = await Design.findOne({ orderId }).lean();
    if (!design) {
        throw new Error('Design not found');
    }
    return design;
};

/*  
    input: review
    output: None
    adds a new review to a profile page
*/
const addReview = async (username, reviewData) => {
    // Find the designer's profile
    const designerProfile = await DesignerProfile.findOne({ username: reviewData.designerUsername });
    if (!designerProfile) {
        throw new Error('Designer not found');
    }

    reviewData.userPicture = await getClientImage(username);

    // Check if the review already exists for the user
    const existingReview = designerProfile.reviews.find(
        (review) => review.username === username
    );

    if (existingReview) {
        // If review exists, update it
        existingReview.number = reviewData.number;
        existingReview.review = reviewData.review;
    } else {
        // If no review exists, create a new one and add it to the reviews array
        const newReview = {
            designerUsername: reviewData.designerUsername, // Make sure to add this line
            username,
            number: reviewData.number,
            review: reviewData.review,
            userPicture: reviewData.userPicture,
        };
        designerProfile.reviews.push(newReview);
    }

    // Save the updated designer profile
    await designerProfile.save();

    return designerProfile; // Return the updated designer profile
};

/**
 * reads a file from a path and returns it as a base 64 image
 */
const getDesignString = (path) => {
    // Read the image file as a buffer
    const imagePath = paths.join(__dirname, path);
    const imageBuffer = fs.readFileSync(imagePath);
    // Convert the image buffer to a Base64 string
    const base64Image = imageBuffer.toString('base64');
    return `data:image/png;base64,${base64Image}`
}

/*

*/
async function deleteImage(filePath) {
    try {
        await fs.promises.unlink(filePath); // Deletes the file
        console.log(`File deleted successfully: ${filePath}`);
    } catch (error) {
        console.error(`Error deleting file: ${filePath}`, error);
    }
}


async function saveBase64Image(base64String, filePath) {
    try {
        // Remove the data URL prefix (if present), works for png, jpeg, or any base64 encoded image type
        const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');

        // Write the base64 image data to a file asynchronously
        await fs.promises.writeFile(filePath, base64Data, 'base64');

        console.log(`Image saved as ${filePath}`);
    } catch (err) {
        console.error('Error saving image:', err);
    }
}

const { spawn } = require('child_process');
const path = require('path');

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
}

q = []

// return tried on design, waits for its turn
const tryOn = async (orderId, url, username) => {
    // Add to queue
    q.push({ orderId, url, username });
    try {
        console.log('Current Queue:', q);
        console.log(orderId)
        // Wait until it's the only item in the queue
        await waitForTurn(orderId);
        console.log(orderId)
        // process the tryon
        result = await processTryOn(orderId, url, username)
        // Remove from queue
        q.shift();
        return result
    } catch (error){
        q.shift();
        throw error;
    }
};

// checks periodically for its turn
const waitForTurn = async (orderId) => {
    while (q[0]?.orderId !== orderId) {
        // Wait for a short period before checking again
        await new Promise((resolve) => setTimeout(resolve, 100));
    }
};

/* 
    return the design with the tried on requested cloths
    for this it talks to the wsl server
*/
const processTryOn = async (orderId, url, username) => {
    // Correct the script path
    const scriptPath = path.resolve(__dirname, '..', 'talkToWsl.py');
    const deletePath = path.resolve(__dirname, '..', 'triedOn.jpg')
    const modelAndClothPath = path.resolve(__dirname, '..')
    const modelPath = path.resolve(__dirname, '..', 'model.jpg');
    const clothPath = path.resolve(__dirname, '..', 'cloth.jpg');
    try {
        // Ensure the script exists
        await fs.promises.access(scriptPath);
        
        if (!await isClientInOrder(orderId, username)) {
            throw new Error('Order not found or unauthorized access');
        }
        const design = await Design.findOne({ orderId });
        if (!design) {
            throw new Error('Design not found for the given orderId');
        }
        
        const existingEntry = await design.items.find(item => item.url === url);
        if (existingEntry) {
            if (existingEntry.typeOfCloth != 'shirt') {
                return design
            }
            const model = await getClientImage(username)
            const cloth = existingEntry.imageOfCloth
            console.log(typeof model)
            await saveBase64Image(model, modelPath)
            await saveBase64Image(cloth, clothPath)
            // Run the Python script
            await runPythonScript(scriptPath, modelAndClothPath);
            existingEntry.imageOfWornCloth = getDesignString('../triedOn.jpg');
        } else {
            throw new Error('No URL found in the design items');
        }
        const updatedDesign = await design.save();
        await deleteImage(deletePath)
        await deleteImage(modelPath)
        await deleteImage(clothPath)
        return updatedDesign
    } catch (err) {
        console.error('Error in tryOn:', err);
        throw err;
    }
};

module.exports = { getReview, orderIsFinished, runPythonScript, addReview, getClientOrders, purchaseOrder, getDesign, tryOn };

