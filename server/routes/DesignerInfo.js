const express = require('express');
const DesignerAuthController = require('../controllers/DesignerInfo');
const router = express.Router();

router.route('/')
    .get(DesignerAuthController.getInfo)
    .post(DesignerAuthController.updateDesignerInfo);

module.exports = router;
