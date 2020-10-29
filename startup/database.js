/**
 * Mongoose provides a straight-forward, schema-based solution to model your application data
 */
const mongoose = require('mongoose');

module.exports = function (winston, config) {

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