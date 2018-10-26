const express = require('express'),
    messageController = require('../controller/message');

var router = express.Router();

router.post('/add', messageController.addMessage);

router.get('/getAll', messageController.getAllMessage);

router.get('/getUnread', messageController.getUnread);

router.get('/channel', messageController.getMessageByChannel);

module.exports = router;