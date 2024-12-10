const designerService = require('../../services/designer/DesignerOrderService');
const jwt = require('jsonwebtoken');
const secretToken = "even doctor evil won't crack this well differentiated boy"


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
        console.log(error)
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

/*
    checks if designer is in this order
*/
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
        console.log(error);
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
        console.log(error);
        return res.status(500).json("Internal Server Error");
    }
};

/*
    checks if the url entered is from the everlane site
*/
const isEverlaneUrl = (url) => {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.hostname.endsWith('everlane.com');
    } catch (error) {
        console.log(error);
        return false;
    }
};

/*
    input: orderId, url, typeOfCloth
    output: updated design with the image of the cloth in the url
*/
const addDesignEntry = async (req, res) => {
    try {
        const { orderId, url, typeOfCloth } = req.body
        console.log(req.body)
        checkInOrder(req, orderId)
        let notAbleToAdd = await designerService.notAbleToAdd(orderId)
        if (notAbleToAdd) {
            return res.status(401).json("too many outfits or finished order");
        }
        if (!isEverlaneUrl(url)) {
            return res.status(401).json("url isnt from everlane");
        }
        const designs = await designerService.addDesignEntry(orderId, url, typeOfCloth);
        return res.status(200).json(designs);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error");
    }
}

/*
    input: orderId, url
    output: updated design without that item
*/
const removeDesignEntry = async (req, res) => {
    try {
        const { orderId, url } = req.body
        checkInOrder(req, orderId)
        let notAbleToRemove = await designerService.notAbleToRemove(orderId)
        if (notAbleToRemove) {
            return res.status(401).json("finished order");
        }
        const designs = await designerService.removeDesignEntry(orderId, url);
        return res.status(200).json(designs);
    } catch (error) {
        console.log(error)
        return res.status(500).json("Internal Server Error");
    }
}
/*
    input: orderId, url
    output: new design with outfit tried on
*/
const tryOn = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secretToken);
        const { orderId, url, typeOfOutfit } = req.body
        const designs = await designerService.tryOn(orderId, url, decoded.username);
        return res.status(200).json(designs);
    } catch (error) {
        console.log(error)
        return res.status(500).json("Internal Server Error");
    }
}

module.exports = { tryOn, getOrders, acceptOrder, rejectOrder, manageOrder, sendOrder, addDesignEntry, removeDesignEntry };
