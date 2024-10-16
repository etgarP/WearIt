const express = require('express');
const ClientAuthController = require('../../controllers/client/ClientAuth');
const router = express.Router();

router.route('/signIn')
    .post(ClientAuthController.signInClient);

router.route('/signUp')
    .post(ClientAuthController.signUpClient);

module.exports = router;