const express = require('express');
const ClientOrderController = require('../../controllers/client/ClientOrder');
const router = express.Router();

router.route('/')
    .get(ClientOrderController.getMyOrders)
    .post(ClientOrderController.purchaseOrder);

router.route('/design')
    .get(ClientOrderController.getDesign);

router.route('/review')
    .post(ClientOrderController.addReview);

module.exports = router;
