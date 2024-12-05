const express = require('express');
const DesignerAuthController = require('../../controllers/designer/DesignerAuth.js');
const router = express.Router();

// Routhes for authenticating the designer
router.route('/signIn')
    .post(DesignerAuthController.signInDesigner);

router.route('/signUp')
    .post(DesignerAuthController.signUpDesigner);

module.exports = router;
