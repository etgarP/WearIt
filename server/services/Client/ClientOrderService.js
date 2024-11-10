const Order = require('../../models/Order');
const DesignerProfile = require('../../models/desinger/DesignerProfile');
const Design = require('../../models/desinger/Design');
const Review = require('../../models/Review');
/*  
    input: client username
    output: list of client orders
*/
const getClientOrders = async (username) => {
    return await Order.find({ username });
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
    const newOrder = new Order({ ...order, username });

    try {
        const savedOrder = await newOrder.save();
        console.log("Saved Order:", savedOrder);  // Check if order is saved
        return savedOrder;
    } catch (error) {
        return null;  // Return null if there's an error
    }
};

/*  
    input: username 
    output: all the designs for the client
    save the current design
*/
const getDesign = async (orderId, username) => {
    // First find the order and check ownership
    const order = await Order.findOne({
        _id: orderId,
        username: username
    });

    if (!order) {
        throw new Error('Order not found or unauthorized access');
    }

    // Once verified, get the design
    const design = await Design.findOne({ orderId });
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
    // Find and update the review if it exists, or create a new one if it doesn't (upsert)
    const review = await Review.findOneAndUpdate(
        { username, designerUsername: reviewData.designerUsername },
        {
            number: reviewData.number,
            review: reviewData.review
        }, // new: true returns the updated document and set, upsert inserts if not there
        { new: true, upsert: true, setDefaultsOnInsert: true } 
    );
    // Add the review ID to the designer's profile if it's not already present
    await DesignerProfile.findOneAndUpdate(
        { username: reviewData.designerUsername },
        { $addToSet: { reviews: review._id } } // $addToSet ensures the ID is not added multiple times
    );
};

module.exports = { orderIsFinished, addReview, getClientOrders, purchaseOrder, getDesign };
