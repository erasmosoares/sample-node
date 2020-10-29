
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
 * Winston, used for logging 
 */
const winston = require('winston');

/**
 * Load config module
 * To use different configuration you can change the NODE_ENV environment variable: 
 * $env:NODE_ENV={default,development,production}
 */
const config = require('config');

require('./startup/logging')(app, winston, config);
require('./startup/config')(config);
require('./startup/routes')(app);
require('./startup/database')(winston, config);

/**
 * Express Error Middleware, must be called after the routes definition
 */
const error = require('./middleware/error');
app.use(error);


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


// Simulating an unhandled promise rejection
//const p = Promise.reject(new Error('Something failed miserably'));
//p.then(() => console.log('Done'));

// Simulating an unhandled exception
//throw new Error('Something failed during startup');


/**
 * Template engine
 */
app.set('view engine', 'pug');
app.set('views', './views'); //defaul folder is view


/**
 * Listener and configs
 */
const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
