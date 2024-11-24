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
            if (order.status === 'finished') {
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
    var finished = await Order.find({ designer, username, status: 'finished' })
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
    image2 = await getDesignerImage(order.designer)
    // Add the client's image to the order
    const newOrder = new Order({ ...order, username, clientImage: image, designerImage: image2 });

    // Save the order to the database
    const savedOrder = await newOrder.save();
    console.log("Saved Order:", savedOrder); // Check if order is saved
    // Create a corresponding design entry for the new order
    const newDesign = new Design({
        orderId: savedOrder._id,
        items: [] // Populate this with initial design entries as needed
    });
    const savedDesign = await newDesign.save();    
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
    console.log(reviewData)
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




const getDesignString = (path) => {
    // Read the image file as a buffer
    const imagePath = paths.join(__dirname, 'worn.png');
    const imageBuffer = fs.readFileSync(imagePath);
    // Convert the image buffer to a Base64 string
    const base64Image = imageBuffer.toString('base64');
    return `data:image/png;base64,${base64Image}`
}

const mongoose = require('mongoose');

const tryOn = async (orderId, url, username) => {
    if (!await isClientInOrder(orderId, username)) {
        throw new Error('Order not found or unauthorized access');
    }

    // Ensure orderId is a valid ObjectId
    const design = await Design.findOne({ orderId });
    if (!design) {
        throw new Error('Design not found for the given orderId');
    }

    // Check if an entry with the same URL already exists and update it
    const existingEntry = design.items.find(item => item.url === url);
    if (existingEntry) {
        existingEntry.imageOfWornCloth = getDesignString('worn.png');
        existingEntry.typeOfCloth = 'shirt'; // Default type, can be modified as needed
    } else {
        throw new Error('No URL found in the design items');
    }

    // Save the updated design document
    const updatedDesign = await design.save();
    return updatedDesign;
};


module.exports = { getReview, orderIsFinished, addReview, getClientOrders, purchaseOrder, getDesign, tryOn };

