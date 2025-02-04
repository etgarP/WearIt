const express = require('express');
const ClientOrderController = require('../../controllers/client/ClientOrder');
const router = express.Router();

// Routes for handeling anything related to the ordering process
router.route('/')
    .get(ClientOrderController.getMyOrders)
    .post(ClientOrderController.purchaseOrder);

router.route('/:orderId')
    .get(ClientOrderController.getDesign);

router.route('/review')
    .post(ClientOrderController.addReview);

router.route('/try-on') 
    .post(ClientOrderController.tryOn)

// router.route('/review/:designer')
//     .get(ClientOrderController.getReview)

module.exports = router;
