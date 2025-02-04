const express = require('express');
const DesignerOrderController = require('../../controllers/designer/DesignerOrder');
const router = express.Router();

// Routes for handeling anything order related
router.route('/')
    .get(DesignerOrderController.getOrders);

router.route('/try-on')
    .post(DesignerOrderController.tryOn);

router.route('/add-design')
    .post(DesignerOrderController.addDesignEntry);

router.route('/remove-design')
    .post(DesignerOrderController.removeDesignEntry);

router.route('/:orderId')
    .get(DesignerOrderController.manageOrder)
    .post(DesignerOrderController.sendOrder);

router.route('/acc/:orderId')
    .post(DesignerOrderController.acceptOrder);

router.route('/rej/:orderId')
    .post(DesignerOrderController.rejectOrder);


module.exports = router;
