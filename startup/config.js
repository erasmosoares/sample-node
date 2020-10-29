module.exports = function (config) {

    // To export the key use the command: $env:_jwtPrivateKey={key_name}
    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined');
    }

}