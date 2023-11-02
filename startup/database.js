const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

module.exports = function () {

    const database = validateConfig(config);

    mongoose.set('strictQuery', false);
    mongoose.connect(database)
    .then(() => {
        winston.info(`Connected to ${database}...`);
    });
}

function validateConfig(config) {
    const database = config.get('connectionString');
    if (!database) {
        winston.error('FATAL ERROR: connectionSting is not defined');
        process.exit(1);
    }
    return database;
}