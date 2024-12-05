const express = require('express');
const DesignerAuthController = require('../../controllers/designer/DesignerInfo');
const router = express.Router();

// Routes for getting and changing matching info
router.route('/')
    .get(DesignerAuthController.getInfo)
    .post(DesignerAuthController.updateDesignerInfo);

module.exports = router;
