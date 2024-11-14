const designerService = require('../../services/designer/DesignerOrderService');
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
        const { orderId } = req.params;
        checkInOrder(req, orderId)
        const { clientInfo, design } = await designerService.getOrderDetails(orderId);
        return res.status(200).json({ clientInfo, design });
    } catch (error) {
        console.log(error)
        return res.status(500).json("Internal Server Error");
    }
};

const checkInOrder = (req, orderId) => {
    const token = req.headers.authorization.split(' ')[1];
    username = jwt.verify(token, secretToken).username;
    if (!designerService.isDesignerInOrder(orderId, username)) {
        throw new Error('Order not found or unauthorized access');
    }
}

/*  
    input: Design
    output: None
    changes design to finished which opens it to costumer
*/
const sendOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        checkInOrder(req, orderId)
        gotAllItems = await designerService.itemsDelivered(orderId)
        if (!gotAllItems) {
            return res.status(401).json("Havent delivered the outfits");
        }
        const success = await designerService.sendOrder(orderId);
        if (success)
            return res.status(200).json("Order sent successfully");
        else
            return res.status(401).json("Wrong details");

    } catch (error) {
        console.log(error)
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
        const orderId = req.params.orderId;
        checkInOrder(req, orderId)
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
        const orderId = req.params.orderId;
        checkInOrder(req, orderId)
        const success = await designerService.rejectOrder(orderId);
        if (success)
            return res.status(200).json("Order saved successfully");
        else
            return res.status(200).json("Order wasn't saved");
    } catch (error) {
        return res.status(500).json("Internal Server Error");
    }
};

const addDesignEntry = async (req, res) => {
    try {
        const { orderId, url } = req.body
        checkInOrder(req, orderId)
        let atLimit = await designerService.isAtLimit(orderId)
        if (atLimit) {
            return res.status(401).json("too many outfits");
        }
        const designs = await designerService.addDesignEntry(orderId, url);
        return res.status(200).json(designs);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error");
    }
}

const removeDesignEntry = async (req, res) => {
    try {
        const { orderId, url } = req.body
        checkInOrder(req, orderId)
        const designs = await designerService.removeDesignEntry(orderId, url);
        return res.status(200).json(designs);
    } catch (error) {
        console.log(error)
        return res.status(500).json("Internal Server Error");
    }
}

module.exports = { getOrders, acceptOrder, rejectOrder, manageOrder, sendOrder, addDesignEntry, removeDesignEntry };
