const UsersController = require("../controllers/Users")

const express = require('express')
var router = express.Router()

router.route('/:username').get(UsersController.getUser)
router.route('/').post(UsersController.postUser)

module.exports = router