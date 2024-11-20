const express = require('express');
const ClientInfoController = require('../../controllers/client/ClientMatch');
const router = express.Router();

router.route('/')
    .get(ClientInfoController.matches);

router.route('/info')
    .get(ClientInfoController.getInfo);

router.route('/info')
    .post(ClientInfoController.changeInfo);

module.exports = router;