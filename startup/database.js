const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

module.exports = function () {

    const database = validateConfig(config);

    mongoose.connect(database, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
        .then(() => {
            winston.info(`Connected to ${database}...`);
        });
}

function validateConfig(config) {
    const database = config.get('connectionSting');
    if (!database) {
        winston.error('FATAL ERROR: connectionSting is not defined');
        process.exit(1);
    }
    return database;
}