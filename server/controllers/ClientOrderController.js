const orderService = require('../services/OrderService');
const jwt = require('jsonwebtoken');

/*  
    input: userName, password, ClientInfo
    output: json web token (sent as token)
    authenticate the user and sends back the token for the user
*/
const getMyOrders = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'your-secret-key');
        const orders = await orderService.getClientOrders(decoded.username);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
};

const purchaseOrder = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'your-secret-key');
        const order = req.body.Order;
        await orderService.purchaseOrder(decoded.username, order);
        return res.status(200).send("Order purchased successfully");
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = { getMyOrders, purchaseOrder };
