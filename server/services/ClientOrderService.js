const Order = require('../models/Order');

/*  
    input: client username
    output: list of client orders
*/
const getClientOrders = async (username) => {
    return await Order.find({ username });
};

/*  
    input: username, order
    output: none
    adds the order to the database
*/
const purchaseOrder = async (username, order) => {
    const newOrder = new Order({ ...order, username });
    await newOrder.save();
};

/*  
    input: username 
    output: all the designs for the client
    save the current design
*/
const getClientDesigns = async (username) => {
    return await Design.find({ 'order.username': username }).populate('order');
};


module.exports = { getClientOrders, purchaseOrder };
