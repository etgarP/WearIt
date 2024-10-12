const orderService = require('../services/ClientOrderService');
const authService = require('../services/ClientAuthService');
const jwt = require('jsonwebtoken');
const designerProfileService = require('../services/DesignerProfileService');
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
        await designerService.saveDesign(savedOrder._id, [])
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
        const review = req.body.review;
        if (!await orderService.orderIsFinished(decoded.username, review.designerUsername)) {
            return res.status(401).send("Unauthorized to write a review");
        }
        await orderService.addReview(decoded.username, review);
        return res.status(200).send("Review added successfully");
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
};

/*  
    input: jsonwebtoken
    output: all finished order designs
*/
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

/*  
    input: clientInfo, designerInfo
    output: thier match score
*/
function calculateMatchScore(client, designer) {
    let score = 0;
    // Match on gender
    if (client.gender === designer.gender) {
        score += 10;
    }
    // Match on city
    if (client.city === designer.city) {
        score += 10;
    }
    // Match on religion
    if (client.religion === designer.religion) {
        score += 10;
    }
    // Age proximity
    const ageDifference = Math.abs(client.age - designer.age);
    if (ageDifference <= 5) {
        score += 10;
    } else if (ageDifference <= 10) {
        score += 5;
    }
    return score;
}

/*  
    input: clientInfo, designerInfos
    output: their match score
*/
const filterTopNMatches = async (client, designers, N) => {
    const designerMatches = designers.map(designer => {
        const designerInfo = designer.designerInfo;
        designer.designerInfo = null;
        var score = calculateMatchScore(client, designerInfo)
        designer.score = score
        return { designer, score };
    });
    designerMatches.sort((a, b) => b.score - a.score); // Sort in descending order based on score
    return designerMatches.slice(0, N); // Return the top N matches
}

/*  
    input: jsonwebtoken
    output: top matches
*/
const matches = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secretToken);
        const clientProfile = await authService.getClientInfo(decoded.username)
        const AllDesigners = await designerProfileService.getAllProfiles()
        const result =  await filterTopNMatches(clientProfile, AllDesigners, 10)
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }   
}

module.exports = { getMyOrders, purchaseOrder, addReview, getDesigns, matches };
