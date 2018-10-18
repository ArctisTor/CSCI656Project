process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var async = require('async');

async.waterfall([
    //log
    //config
    function(next) {

        process.on('uncaughtException', err => {
            console.error(err);
            process.exit(1);
        });

        console.log('Starting web-server...');
        require('./web').start(function (err) {
            if (err) {
                return next(err);
            }

            console.log('Server started.');
            next();
        });
    }
], function(err) {

    if(err) {
        console.error('Failed to start web-server:');
        throw err;
    }

});