const express = require('express'),
    router = express.Router();

var userRouter = require('./user-routes'),
    messageRouter = require('./message-router'),
    auth = require('../middleware/auth');


router.use('/', userRouter);

router.use('/message', auth.authenticate, messageRouter);

module.exports = router;