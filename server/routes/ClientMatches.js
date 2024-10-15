const express = require('express');
const ClientOrderController = require('../controllers/ClientOrder');
const ClientAuthController = require('../controllers/ClientAuth');
const router = express.Router();

router.route('/')
    .get(ClientOrderController.matches);

router.route('/info')
    .post(ClientAuthController.changeInfo);

module.exports = router;