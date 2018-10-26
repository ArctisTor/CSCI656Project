const express = require('express'),
    router = express.Router();

var userRouter = require('./user-routes'),
    messageRouter = require('./message-router');


router.use('/', userRouter);

router.use('/message', messageRouter);

module.exports = router;