const express = require('express');
const ClientDesignController = require('../controllers/ClientDesign');
const router = express.Router();

router.route('/')
    .get(ClientDesignController.getDesigns);

router.route('/review')
    .post(ClientDesignController.reviewDesign);

module.exports = router;
