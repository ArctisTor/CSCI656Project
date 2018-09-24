/**
 * Module dependencies.
 */
const express = require('express'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    http = require('http'),
    https = require('https'),
    config = require('./config');

module.exports.start = function (callback) {

    /**
     * Create Express server.
     */
    const app = express();

    /**
     * Add Mongo/Mongoose connection stuff here
     */
    config.get(function (err, config) {

        if (err) {
            return callback(err);
        }

        /**
         * Express configuration.
         *
         */
        app.set('port', config.server.port || 8100);
        app.use(compression());
        app.use(bodyParser({ limit: '10mb' }));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        // serve web app
        app.use(express.static(__dirname + '/..' + '/public'));
        // app.use('/api/v1', require('./routes/'));


        /**
         * Error Handler.
         */
        app.use((err, req, res, next) => {
            log.error(err);
            res.status(err.status || 500).json({ message: err.message })
        });

        /**
         * Start Express server.
         */
        http.createServer(app).listen(app.get('port'), callback);


    });
};