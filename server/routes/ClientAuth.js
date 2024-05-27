const express = require('express');
const ClientAuthController = require('../controllers/ClientAuth');
const router = express.Router();

router.route('/signIn')
    .get(ClientAuthController.signInClient);

router.route('/signUp')
    .post(ClientAuthController.signUpClient);

module.exports = router;