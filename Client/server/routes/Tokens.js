const TokensController = require("../controllers/Tokens")


const express = require('express')
var router = express.Router()

router.route('/').post(TokensController.postToken)

module.exports = router