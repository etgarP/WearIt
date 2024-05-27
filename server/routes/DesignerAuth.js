const express = require('express');
const DesignerAuthController = require('../controllers/DesignerAuth');
const router = express.Router();

router.route('/signIn')
    .get(DesignerAuthController.signInDesigner);

router.route('/signUp')
    .post(DesignerAuthController.signUpDesigner);

module.exports = router;
