var config = exports,

    fs = require('fs'),
    async = require('async'),
    lastConfig;

config.get = function(callback) {

    if (lastConfig) {

    } else {
        fs.readFile(__dirname + '/config/appconfig.json', function(err, data) {
            lastConfig = data;
            callback(err, JSON.parse(lastConfig));
        });
    }
};