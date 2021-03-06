const User = require('../models/user'),
    tokenAuth = require('../models/authorizationToken'),
    uuid = require('uuid'),
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
                let token = new tokenAuth({
                    "userId" : user._id,
                    "tokenKey" : uuid().replace(/-/g, '')
                });

                token.save((err, t) => {

                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.json({
                            user : user,
                            tokenKey: t.tokenKey
                        });
                    }

                });
            }

        });
};

exports.register = function (req, res) {


    var user = {
        "username" : req.body.params.userName,
        "password" : encryptor.encrypt(req.body.params.password),
        "channels" : ["general"]
    };



    let post = new User(user);

    post.save((err, user) => {

        if (err) {
            res.status(500).send(err);
        } else {

            let token = new tokenAuth({
                "userId" : user._id,
                "tokenKey" : uuid().replace(/-/g, '')
            });

            token.save((err, t) => {

                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json({
                        user : user,
                        tokenKey: t.tokenKey
                    });
                }

            });
        }

    });
};

exports.logout = function(req, res) {

    tokenAuth.findOneAndRemove({'tokenKey' : req.query.tokenKey}, (err, token) => {

        if (err) {
            return res(new Error('Token does not exist: ' + req.query.tokenKey));
        } else if (!token) {
            res.status(404).send('No token was issued with that id.');
        } else {
            res.status(200).send(true);
        }
    })


};