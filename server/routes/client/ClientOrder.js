const express = require('express');
const ClientOrderController = require('../../controllers/client/ClientOrder');
const router = express.Router();

router.route('/')
    .get(ClientOrderController.getMyOrders)
    .post(ClientOrderController.purchaseOrder);

router.route('/:orderId')
    .get(ClientOrderController.getDesign);

router.route('/review')
    .post(ClientOrderController.addReview);

router.route('try-on') 
    .post(ClientOrderController.tryOn)

module.exports = router;
