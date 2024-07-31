const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

module.exports = function (app) {

    let database;

    if (app.get('env') === 'test'){
        console.log('Loading tests DB');
        database = validateConfig('connectionStringTest');        
    } else {
        database = validateConfig('connectionString');
    };

    

    mongoose.set('strictQuery', false);
    mongoose.connect(database)
    .then(() => {
        winston.info(`Connected to ${database}...`);
    });
}

function validateConfig(configName) {
    const database = config.get(configName);
    if (!database) {
        winston.error(`FATAL ERROR: ${configName} is not defined`);
        process.exit(1);
    }
    return database;
}