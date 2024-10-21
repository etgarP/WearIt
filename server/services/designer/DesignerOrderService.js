const Order = require('../../models/Order');
const Design = require('../../models/desinger/Design');
const ClientInfo = require('../../models/client/ClientInfo');

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
    const order = await Order.findById(orderId);
    console.log(order)
    const clientInfo = await ClientInfo.find({username: order.username})
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
        if (order.status == 'finished') return false
        order.status = status;
        await order.save();
        await saveDesign(orderId, design.urls)
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
const saveDesign = async (orderId, urls) => {
    const order = await Order.findById(orderId);
    if (!order) {
        console.log('Order not found')
        throw new Error('Order not found');
    }
    if (order.status !== 'finished') {
        await Design.findOneAndUpdate(
            { orderId },
            { orderId, urls }, // new: true returns the updated document and set, upsert inserts if not there
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        return true
    }
    return false
};

module.exports = { getOrders, getOrderDetails, acceptOrder, rejectOrder, sendOrder, saveDesign };
