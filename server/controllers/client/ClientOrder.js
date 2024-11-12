const orderService = require('../../services/Client/ClientOrderService');
const designerProfileService = require('../../services/designer/DesignerProfileService')
const jwt = require('jsonwebtoken');
const designerService = require('../../services/designer/DesignerOrderService');
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
        return res.status(200).json(orders);
    } catch (error) {
        console.log(error)
        return res.status(500).json("Internal Server Error");
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

        // Retrieve the designer profile based on the order's username
        const profile = await designerProfileService.getProfile(order.designer);

        // Find the matching specialization (case-insensitive)
        const matchingSpecialization = profile.specialization.find(specialty =>
            specialty.toLowerCase() === order.occasion.toLowerCase()
        );

        // Validate profile and order details
        if (!profile || profile.numberOfOutfits > 100
            || order.numberOfOutfits < 0 || !matchingSpecialization) {
            console.log(!matchingSpecialization, profile.specialization, order.occasion);
            return res.status(400).json("Invalid order details");
        }

        // Update order occasion to the exact case found in the profile's specialization
        order.occasion = matchingSpecialization;

        // Update order information with the decoded token's username
        order.username = decoded.username;
        order.status = 'pending';
        console.log(order);

        // Save the order and check for success
        const savedOrder = await orderService.purchaseOrder(decoded.username, order);
        if (!savedOrder) {
            console.error("Order was not saved to MongoDB");
            return res.status(500).json("Failed to save order");
        }

        // Save an empty design linked to the saved order's ID
        const designResult = await designerService.saveDesign(savedOrder._id, []);
        if (!designResult) {
            return res.status(500).json("Failed to create design");
        }

        return res.status(200).json("Order purchased successfully");
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error");
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
        const review = req.body.review;
        if (!await orderService.orderIsFinished(decoded.username, review.designerUsername)) {
            return res.status(401).json("Unauthorized to write a review");
        }
        await orderService.addReview(decoded.username, review);
        return res.status(200).json("Review added successfully");
    } catch (error) {
        return res.status(500).json("Internal Server Error");
    }
};

/*  
    input: jsonwebtoken
    output: all finished order designs
*/
const getDesign = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secretToken);
        const orderId = req.body.orderId
        const designs = await orderService.getDesign(orderId, decoded.username);
        return res.status(200).json(designs);
    } catch (error) {
        return res.status(500).json("Internal Server Error");
    }
};

const tryOn = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secretToken);
        const {orderId, url} = req.body
        const designs = await orderService.tryOn(orderId, url, decoded.username);
        return res.status(200).json(designs);
    } catch (error) {
        return res.status(500).json("Internal Server Error");
    }
}

module.exports = { getMyOrders, purchaseOrder, addReview, getDesign, tryOn };
