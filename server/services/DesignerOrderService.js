const Order = require('../models/Order');
const Design = require('../models/Design');

/*  
    input: username
    output: all the orders for the designer
*/
const getOrders = async (username) => {
    return await Order.find({ designer: username });
};

/*  
    input: order id
    output: gets order by order id 
*/
const getOrderDetails = async (orderId) => {
    const order = await Order.findById(orderId).populate('clientInfo design');
    return { clientInfo: order.clientInfo, design: order.design };
};

/*  
    input: order id, design
    output: None.
    saves order as finish 
*/
const sendOrder = async (orderId, design) => {
    const order = await Order.findById(orderId);
    if (order) {
        order.status = 'finished';
        await order.save();
        const newDesign = new Design({ orderId, urls: design.urls });
        await newDesign.save();
    }
};

/*  
    input: username and design
    output: None
    save the current design
*/
const saveOrder = async (username, design) => {
    const order = new Design({ designer: username, urls: design.urls });
    await order.save();
};

module.exports = { authenticate, getClientDesigns, createDesigner, getOrders, getOrderDetails, sendOrder, saveOrder, getProfile, saveProfile };
