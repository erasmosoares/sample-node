const config = require('config');

/**
 * Load config module
 * To use different configuration you can change the NODE_ENV environment variable: 
 * $env:NODE_ENV={default,development,production}
 */
module.exports = function () {

    // console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

    // To export the key use the command: $env:_jwtPrivateKey={key_name}
    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined');
    }

}