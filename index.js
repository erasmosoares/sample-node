/**
 * Load config module
 * To use different configuration you can change the NODE_ENV environment variable: 
 * $env:NODE_ENV={default,development,production}
 */
const config = require('config');

// To export the key use the command: $env:_jwtPrivateKey={key_name}
if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}
/**
 * Mongoose provides a straight-forward, schema-based solution to model your application data
 */
const mongoose = require('mongoose');

if (!config.get('connectionSting')) {
    console.error('FATAL ERROR: connectionSting is not defined');
    process.exit(1);
}

mongoose.connect(config.get('connectionSting'), { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => console.log('Connected to MongoDb...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

/**
 * Express is a minimal and flexible Node.js web application framework 
 * that provides a robust set of features for web and mobile applications.
 */
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); //access the sample static file

/**
 * HTTP request logger middleware for node.js.
 */
const morgan = require('morgan');
app.use(morgan('tiny'));

/**
 * Helmet helps you secure your Express apps by setting various HTTP headers.
 */
const helmet = require('helmet');
app.use(helmet());

/**
 * CORS is responsible for allowing or not asynchronous requests 
 * from other domains.
 */
const cors = require("cors");
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

/**
 * Async-errors middleware
 * Apply try-catch to the routes
 */
require('express-async-errors');

/**
 * Winston, used for logging 
 */
const winston = require('winston');
/**
 * Mongodb Transport for Winston
 */
require('winston-mongodb');

if (!config.get('connectionSting-log')) {
    console.error('FATAL ERROR: connectionSting-log is not defined');
    process.exit(1);
}

winston.add(new winston.transports.File({ filename: 'logfile.log', handleExceptions: true }));
winston.add(new winston.transports.MongoDB({ db: config.get('connectionSting-log') }));

process.on('unhandledRejection', (ex) => {
    throw ex;
});

// Simulating an unhandled promise rejection
//const p = Promise.reject(new Error('Something failed miserably'));
//p.then(() => console.log('Done'));

// Simulating an unhandled exception
//throw new Error('Something failed during startup');

/**
 * Custom Middleware 
 */
const logger = require('./middleware/logger');
app.use(logger);

/**
 * Template engine
 */
app.set('view engine', 'pug');
app.set('views', './views'); //defaul folder is view

/**
 * Routes
 */
const home = require('./routes/common/home');
const users = require('./routes/common/users');
const auth = require('./routes/common/auth');
const books = require('./routes/books');
app.use('/', home);
app.use('/api/books', books);
app.use('/api/users', users);
app.use('/api/auth', auth);

/**
 * Express Error Middleware, must be called after the routes definition
 */
const error = require('./middleware/error');
app.use(error);
/**
 * Listener and configs
 */
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
