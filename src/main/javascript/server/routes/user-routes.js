const express = require('express'),
    userController = require('../controller/user');

var router = express.Router();

router.get('/login', userController.login);

router.get('/:userId', userController.getUser);

module.exports = router;