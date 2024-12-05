const express = require('express');
const DesignerProfileController = require('../../controllers/designer/DesignerProfile.js');
const router = express.Router();

// Routes for getting and setting the profile
router.route('/')
    .get(DesignerProfileController.getProfile)
    .post(DesignerProfileController.saveProfile);

module.exports = router;
