const User = require('../models/user'),
    encryptor = require('../security/encryptor-lib');

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
};

exports.login = function(req, res) {

    var username,
        password;

    username = req.query.userName;
    password = encryptor.encrypt(req.query.password);


    User.findOne(
        {
            username: username,
            password : password
        },
        (err, user) => {

        if (err) {
            res.status(500).send(err);
        } else if (!user){
            res.status(404).send('Invaild username/password combination');
        }  else {
            res.json(user);
        }

    });
};

exports.register = function (req, res) {


    var user = {
        "username" : req.body.userName,
        "password" : encryptor.encrypt(req.body.password),
        "channels" : ["general"]
    };



    let post = new User(user);

    post.save((err, user) => {

        if (err) {
            res.status(500).send(err);
        } else {
            res.json(user);
        }

    });


};