const express = require('express');
const DesignerAuthController = require('../controllers/DesignerAuth.js');
const router = express.Router();

router.route('/signIn')
    .post(DesignerAuthController.signInDesigner);

router.route('/signUp')
    .post(DesignerAuthController.signUpDesigner);

module.exports = router;
