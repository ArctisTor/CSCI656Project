const log = exports,
    winston = require('winston');

log.create = (name) => {

    return new (winston.Logger) ({
        transports: [
            //Log to console
            new (winston.transports.Console) ({
                label: name,
                timestamp: true,
                colorize: true,
                level: 'debug'
            })
        ]
    });

};