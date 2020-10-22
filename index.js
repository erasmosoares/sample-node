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
const home = require('./routes/home');
const books = require('./routes/books');
app.use('/', home);
app.use('/api/books', books);

/**
 * Listener and configs
 */
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));