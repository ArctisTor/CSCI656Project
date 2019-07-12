const Message = require('../models/message');

    var messageController = exports,
      config = require('../config'),
      http = require('http'),
      io = require('socket.io'),
      async = require('async'),
      socketInfo = require('../middleware/socketInfo').socket;

exports.addMessage = function(req, res) {

    var message = {
        "username" : req.body.username,
        "message" : req.body.message,
        "channel" : req.body.channel,
        "read" : false,
        "submittedAt" : new Date()
    };

    let post = new Message(message);

    post.save((err, message) => {

        if (err) {
            res.status(500).send(err);
        } else {
          // io.emit('successfulMessage', message);
          socketInfo.emit('successfulMessage', message);
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


                async.each(messages, (message, callback) => {

                    message.read = true;
                    message.save((err) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                    });
                    callback(null);

                }, (err) => {

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

    Message.find({"channel" : channel})
        .exec( (err, messages) => {

            if (err) {
                return res.status(500).send(err);
            } else if (messages.length == 0) {
             return res.status(404).send('No messages found for channel: ' + channel);
            } else {
                // res.setHeader('Content-Type', req.query.headers['Content-Type']);
                res.json(messages);
            }
        });
};

exports.getUnreadByChannel = function (req, res) {

    var channel = req.query.channel;

    Message.find({$and: [{"channel" : channel}, {"read" : false}] })
    .exec( (err, message) => {

        if (err) {
            return res.status(500).send(err);
        } else if (message.length == 0) {
            return res.status(404).send('No messages found for channel: ' + channel);
        } else {
            res.json(message);
        }

    })
};