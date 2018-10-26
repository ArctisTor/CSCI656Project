const Message = require('../models/message'),
    async = require('async');

exports.addMessage = function(req, res) {

    var message = {
        "userName" : req.body.userName,
        "message" : req.body.message,
        "channels" : req.body.channels,
        "read" : false
    };

    let post = new Message(message);

    post.save((err, message) => {

        if (err) {
            res.status(500).send(err);
        } else {
            res.json(message);
        }

    });
};

exports.getAllMessage = function(req, res) {

    Message.find()
        .exec((err, messages) => {

            if (err) {
                return res.status(500).send(err);
            } else if (!messages) {
                return res.status(404).send('No message found.');
            }
            else {
                res.json(messages);
            }

    });

};

exports.getUnread = function (req, res) {

    Message.find({"read" : false})
        .exec((err, messages) => {

            if (err) {
                return res.status(500).send(err);
            } else if (messages.length == 0) {
                return res.status(404).send('All Messages have been read.');
            } else {

                async.waterfall(
                    [
                        (callback) => {
                            messages.forEach(function(message) {
                                message.read = true;
                                message.save((err) => {
                                    if (err) {
                                        return res.status(500).send(err);
                                    }
                                });
                            })
                            callback(null);
                        }
                    ], (err) => {
                    if (err) {
                        return res.status(500).send(err);
                    } else {
                        res.json(messages);
                    }
                });
            }
        });
};

exports.getMessageByChannel = function (req, res) {

    var channel = req.query.channel;

    Message.find({"channels" : channel})
        .exec( (err, messages) => {

            if (err) {
                return res.status(500).send(err);
            } else if (messages.length == 0) {
             return res.status(404).send('No messages found for channel: ' + channel);
            } else {
                res.json(messages);
            }
        });


};