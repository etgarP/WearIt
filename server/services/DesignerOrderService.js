const Order = require('../models/Order');
const Design = require('../models/Design');
const ClientInfo = require('../models/ClientInfo');

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
    const username = await Order.findById(orderId).username;
    const clientInfo = await ClientInfo.find({username})
    const design = await Design.find({orderId})
    return { clientInfo, design };
};

/*  
    input: order id, design
    output: None.
    saves order as in diferent status
*/
const sendOrder = async (orderId, design, status) => {
    const order = await Order.findById(orderId);
    if (order) {
        order.status = status;
        await order.save();
        const oldDesign = await Design.findById(design._id);
        oldDesign.urls = design.urls
        await oldDesign.save();
    }
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
    input: design
    output: None
    save the current design
*/
const saveOrder = async (design) => {
    const oldDesign = await Design.findById(design._id);
    oldDesign.urls = design.urls
    await oldDesign.save();
};

module.exports = { getOrders, getOrderDetails, acceptOrder, rejectOrder, sendOrder, saveOrder };
