const express = require('express'),
    userController = require('../controller/user');

var router = express.Router();

router.get('/login', userController.login);

router.post('/register', userController.register);

router.get('/:userId', userController.getUser);

module.exports = router;