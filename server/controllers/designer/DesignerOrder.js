const designerService = require('../../services/designer/DesignerOrderService');
const jwt = require('jsonwebtoken');
const secretToken = "even doctor evil won't crack this bad boy"

/*  
    input: json web token
    output: all orders
*/
const getOrders = async (req, res) => {
    try {
        console.log("hello1")
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secretToken);
        const orders = await designerService.getOrders(decoded.username);
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json("Internal Server Error");
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
        const { orderId } = req.params;
        const { clientInfo, design } = await designerService.getOrderDetails(orderId);
        return res.status(200).json({ clientInfo, design });
    } catch (error) {
        console.log(error)
        return res.status(500).json("Internal Server Error");
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
            return res.status(200).json("Order sent successfully");
        else
            return res.status(401).json("Wrong details");

    } catch (error) {
        return res.status(500).json("Internal Server Error");
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
            return res.status(200).json("Order saved successfully");
        else
            return res.status(401).json("Wrong details");
    } catch (error) {
        return res.status(500).json("Internal Server Error");
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
            return res.status(200).json("Order saved successfully");
        else
            return res.status(200).json("Order wasn't saved");

    } catch (error) {
        return res.status(500).json("Internal Server Error");
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
            return res.status(200).json("Order saved successfully");
        else
            return res.status(200).json("Order wasn't saved");
    } catch (error) {
        return res.status(500).json("Internal Server Error");
    }
};

module.exports = { getOrders, acceptOrder, rejectOrder, manageOrder, sendOrder, saveOrder };
