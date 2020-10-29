const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

module.exports = function () {

    validateConfig(config);

    mongoose.connect(config.get('connectionSting'), {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
        .then(() => {
            winston.info('Connected to MongoDb...');
        });
}

function validateConfig(config) {
    if (!config.get('connectionSting')) {
        winston.error('FATAL ERROR: connectionSting is not defined');
        process.exit(1);
    }
}