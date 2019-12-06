const {transports, createLogger, format} = require('winston');

var options = {
    file: {
        level: 'info',
        filename: __dirname+ '/../logs/mccat.log',
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        colorize: true,
    },
};


// instantiate a new Winston Logger with the settings defined above
var logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.printf(function (info) {
            return `${info.timestamp} - [${info.level}]: ${info.message}`;
        })
    ),
    transports: [
        new transports.File(options.file),
        new transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
});

module.exports = logger;
