const winston = require('winston');
/**
 * Wiston type messages
 * error
 * warn
 * info
 * verbose
 * debug
 * silly
 */

module.exports = function (err, req, res, next) {

    winston.error(err.message, err);

    res.status(500).send('Something failed!');
}
