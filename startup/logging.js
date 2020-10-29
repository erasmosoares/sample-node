/**
 * Mongodb Transport for Winston
 */
require('winston-mongodb');

/**
 * Async-errors middleware
 * Apply try-catch to the routes
 */
require('express-async-errors');

/**
 * HTTP request logger middleware for node.js.
 */
const morgan = require('morgan');

module.exports = function (app, winston, config) {

    app.use(morgan('tiny'));

    if (!config.get('connectionSting-log')) {
        console.error('FATAL ERROR: connectionSting-log is not defined');
        process.exit(1);
    }

    winston.add(new winston.transports.Console({ colorize: true, prettyPrint: true }));
    winston.add(new winston.transports.File({ filename: 'logfile.log', handleExceptions: true }));
    winston.add(new winston.transports.MongoDB({ db: config.get('connectionSting-log') }));

    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

}