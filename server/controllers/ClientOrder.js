const orderService = require('../services/ClientOrderService');
const jwt = require('jsonwebtoken');
const secretToken = "even doctor evil won't crack this bad boy"

/*  
    input: jsonwebtoken in headers 
    output: all orders of user
*/
const getMyOrders = async (req, res) => {
    try {
        // gets the token
        const token = req.headers.authorization.split(' ')[1];
        // verifies its a key given by the server (else error) and gets the username
        const decoded = jwt.verify(token, secretToken);
        // gets all the client's orders
        const orders = await orderService.getClientOrders(decoded.username);
        // returns them
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
};

/*  
    input: order in body, jsonwebtoken in headers 
    output: None
    purchases order
*/
const purchaseOrder = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secretToken);
        const order = req.body.Order;
        await orderService.purchaseOrder(decoded.username, order);
        return res.status(200).send("Order purchased successfully");
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = { getMyOrders, purchaseOrder };
