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

module.exports = function (app) {
    const allowedOrigins = config.get('CorsOrigins');
    if (!allowedOrigins) {
        winston.error('FATAL ERROR: CorsOrigins is not defined');
        process.exit(1);
    }
    /**
    app.use(helmet()); is equivalent to this:
    app.use(helmet.contentSecurityPolicy());
    app.use(helmet.dnsPrefetchControl());
    app.use(helmet.expectCt());
    app.use(helmet.frameguard());
    app.use(helmet.hidePoweredBy());
    app.use(helmet.hsts());
    app.use(helmet.ieNoOpen());
    app.use(helmet.noSniff());
    app.use(helmet.permittedCrossDomainPolicies());
    app.use(helmet.referrerPolicy());
    app.use(helmet.xssFilter());
    */
    app.use(helmet());

    app.use(compression());

    /**
 * Enabling CORS Pre-Flight
 */
    app.use(cors({
        origin: [allowedOrigins],
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }));
}