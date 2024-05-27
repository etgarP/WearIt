const express = require('express');
const ClientOrderController = require('../controllers/ClientOrder');
const router = express.Router();

router.route('/')
    .get(ClientOrderController.getMyOrders)
    .post(ClientOrderController.purchaseOrder);

module.exports = router;
