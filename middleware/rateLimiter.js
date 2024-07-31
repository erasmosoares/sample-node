const rateLimit = require('express-rate-limit');
const config = require('config');

const getMaxPerWindowMs = () => {
    if (config.get('name') === 'test') {
        return 1000;
    }
    return 5;
};

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: getMaxPerWindowMs(), // Limit each IP to 5 or 1000 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = authLimiter;