const express = require('express');
const DesignerOrderController = require('../controllers/DesignerOrder');
const router = express.Router();

router.route('/')
    .get(DesignerOrderController.getOrders);

router.route('/:orderId')
    .get(DesignerOrderController.manageOrder)
    .post(DesignerOrderController.sendOrder);

router.route('/save')
    .post(DesignerOrderController.saveOrder);

module.exports = router;
