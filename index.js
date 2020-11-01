/**
 * HTTP request logger middleware for node.js.
 */
const morgan = require('morgan');
/**
 * Express is a minimal and flexible Node.js web application framework 
 * that provides a robust set of features for web and mobile applications.
 */
const express = require('express');
/**
 * Winston, used for logging 
 */
const winston = require('winston');
/**
 * Express Error Middleware, must be called after the routes definition
 */
const error = require('./middleware/error');

const app = express();
app.use(express.json()); //Recognize the incoming Request Object as a JSON Object
app.use(express.urlencoded({ extended: true })); //If extended is false, you can not post "nested object"
app.use(express.static('public')); //access the sample static file

/**
 * The minimal output.
 * :method :url :status :res[content-length] - :response-time ms
 */
app.use(morgan('tiny'));
/**
 * Template engine
 */
app.set('view engine', 'pug');
app.set('views', './views');

/**
 * Initializing startups 
 */
require('./startup/logging')();
require('./startup/config')();
require('./startup/database')();
require('./startup/routes')(app);
require('./startup/prod')(app);

/**
 * Express Error Middleware, must be called after the routes definition
 */
app.use(error);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;