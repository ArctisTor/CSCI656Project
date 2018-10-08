const User = require('../models/user');

exports.getUser = function(req, res, next) {

    User.findById(req.query.userId, function(err, user) {

       if (err) {
           return next(new Error('User does not exist: ' + req.query.userId));
       } else if (!user) {
           res.status(404).send();
       } else {
           res.json(user);
       }

    });
}