/**
 * Centralize middlewares for production
*/
const config = require('config');

/**
 * CORS is responsible for allowing or not asynchronous requests 
 * from other domains.
 */
const cors = require("cors");

/**
 * Helmet helps you secure your Express apps by setting various HTTP headers.
 */
const helmet = require('helmet');

/**
 * Compresses the HTTP response that is sent to the client
 */
const compression = require('compression');

const rateLimiter = require('../middleware/rateLimiter');

module.exports = function (app) {
    const allowedOrigins = config.get('CorsOrigins');
    if (!allowedOrigins) {
        winston.error('FATAL ERROR: CorsOrigins is not defined');
        process.exit(1);
    }

    app.use(helmet());

    app.use(compression());

    app.use(rateLimiter);

    // export NODE_ENV=production

    console.log(`app env: ${config.get('name')}`);
    console.log(`node env: ${app.get('env')}`);
    console.log('To change it use: NODE_ENV={env_name}')
    
 
    if(app.get('env') === 'development'){
        console.log('Morgan enabled');
    }
    

    /**
 * Enabling CORS Pre-Flight
 */
    app.use(cors({
        origin: [allowedOrigins],
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }));
}