const designerService = require('../services/DesignerOrderService');
const jwt = require('jsonwebtoken');
const secretToken = "even doctor evil won't crack this bad boy"

/*  
    input: json web token
    output: all orders
*/
const getOrders = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secretToken);
        const orders = await designerService.getOrders(decoded.username);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
};

/*  
    input: json web token, orderId
    output: ClientInfo, Design
*/
const manageOrder = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secretToken);
        const orderId = req.params.orderId;
        const { clientInfo, design } = await designerService.getOrderDetails(orderId);
        return res.status(200).send({ clientInfo, design });
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
};

/*  
    input: Design
    output: None
    changes design to finished which opens it to costumer
*/
const sendOrder = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, secretToken);
        const design = req.body.design;
        const success = await designerService.sendOrder(design.orderId, design, 'finished');
        if (success)
            return res.status(200).send("Order sent successfully");
        else 
            return res.status(401).send("Wrong details");

    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
};

/*  
    input: Design
    output: None
    saves design
*/
const saveOrder = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, secretToken);
        const design = req.body.design;
        const success = await designerService.saveDesign(design.orderId, design.url);
        if (success)
            return res.status(200).send("Order saved successfully");
        else
            return res.status(401).send("Wrong details");
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
};

/*  
    input: orderid, jsontoken
    output: None
    accept costumer if its pending
*/
const acceptOrder = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, secretToken);
        const orderId = req.params.orderId;
        const success = await designerService.acceptOrder(orderId);
        if (success)
            return res.status(200).send("Order saved successfully");
        else
            return res.status(200).send("Order wasn't saved");

    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
};

/*  
    input: orderid, jsontoken
    output: None
    rejects costumer if its pending
*/
const rejectOrder = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, secretToken);
        const orderId = req.params.orderId;
        const success = await designerService.rejectOrder(orderId);
        if (success)
            return res.status(200).send("Order saved successfully");
        else
            return res.status(200).send("Order wasn't saved");
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = { getOrders, acceptOrder, rejectOrder, manageOrder, sendOrder, saveOrder };
