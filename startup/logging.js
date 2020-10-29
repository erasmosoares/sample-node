
require('winston-mongodb');
require('express-async-errors');

const winston = require('winston');
const config = require('config');

module.exports = function () {

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