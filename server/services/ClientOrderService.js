const Order = require('../models/Order');
const DesignerProfile = require('../models/DesignerProfile');
const Design = require('../models/Design');
const Review = require('../models/Review');
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
    var finished = Order.find({ designer, username, status: 'finished' }) != null 
    return finished
};

/*  
    input: username, order
    output: none
    adds the order to the database
*/
const purchaseOrder = async (username, order) => {
    const newOrder = new Order({ ...order, username });
    await newOrder.save();
    return newOrder
};

/*  
    input: username 
    output: all the designs for the client
    save the current design
*/
const getClientDesigns = async (username) => {
    return await Design.find({ 'order.username': username, 'order.status': 'finished' }).populate('order');
};

/*  
    input: review
    output: None
    adds a new review to a profile page
*/
const addReview = async (username, reviewData) => {
    const review = new Review({ 
        username, 
        designerUsername: reviewData.designerUsername, 
        number: reviewData.number, 
        review: reviewData.review 
    });
    await review.save();
    await DesignerProfile.findOneAndUpdate(
        { username: rev },
        { $push: { reviews: review._id } }
    );
};

module.exports = { orderIsFinished, addReview, getClientOrders, purchaseOrder, getClientDesigns };
