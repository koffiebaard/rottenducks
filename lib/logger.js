var winston = require('winston');
winston.emitErrs = true;

var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            name: "info-log",
            level: 'info',
            filename: './logs/info.log',
            json: true,
            maxsize: 5242880,
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.File({
            name: "error-log",
            level: 'error',
            filename: './logs/error.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880,
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});


module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};