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
    await newOrder.save();
    console.log(newOrder)
    return newOrder
};

/*  
    input: username 
    output: all the designs for the client
    save the current design
*/
const getClientDesigns = async (username) => {
    return await Design.find().populate({
        path: 'orderId',
        match: { username: username, status: 'finished' },
    }); 
}

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

module.exports = { orderIsFinished, addReview, getClientOrders, purchaseOrder, getClientDesigns };
