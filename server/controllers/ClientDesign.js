const designService = require('../services/ClientOrderService');
const jwt = require('jsonwebtoken');

const getDesigns = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'your-secret-key');
        const designs = await designService.getClientDesigns(decoded.username);
        return res.status(200).send(designs);
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
};

const reviewDesign = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'your-secret-key');
        const review = req.body.Review;
        await designService.addReview(decoded.username, review);
        return res.status(200).send("Review added successfully");
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = { getDesigns, reviewDesign };
