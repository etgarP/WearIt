const express = require('express');
const ClientGroupController = require('../controllers/ClientGroup');
const router = express.Router();

router.route('/')
    .get(ClientGroupController.getGroups);

module.exports = router;
