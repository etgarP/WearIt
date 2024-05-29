const orderService = require('../services/ClientOrderService');
const jwt = require('jsonwebtoken');
const designerService = require('../services/DesignerOrderService');
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
    purchases order - adds order and empty design
*/
const purchaseOrder = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secretToken);
        const order = req.body.order;
        const savedOrder = await orderService.purchaseOrder(decoded.username, order);
        // making a new expty design
        designerService.saveOrder({orderId: savedOrder._id, urls: []})
        return res.status(200).send("Order purchased successfully");
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
};

/*  
    input: review(designerUsername, number, review)
    output: None
    if the two have a finished order, it leaves a review, 
    if a review exists, it updates it 
*/
const addReview = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secretToken);
        const review = req.body.Review;
        if (!await orderService.orderIsFinished(decoded.username, Review.designerUsername)) {
            return res.status(401).send("Unauthorized to write a review");
        }
        await orderService.addReview(review);
        return res.status(200).send("Review added successfully");
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
};

const getDesigns = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secretToken);
        const designs = await orderService.getClientDesigns(decoded.username);
        return res.status(200).send(designs);
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = { getMyOrders, purchaseOrder, addReview, getDesigns };
