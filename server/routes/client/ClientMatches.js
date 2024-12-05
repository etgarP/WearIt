const express = require('express');
const ClientInfoController = require('../../controllers/client/ClientMatch');
const router = express.Router();

// routes for mathing the client - handeling info and recieving matches
router.route('/')
    .get(ClientInfoController.matches);

router.route('/info')
    .get(ClientInfoController.getInfo);

router.route('/info')
    .post(ClientInfoController.changeInfo);

module.exports = router;