const express = require('express'),
    router = express.Router();

var userRouter = require('./user-routes');


router.use('/', userRouter);

module.exports = router;