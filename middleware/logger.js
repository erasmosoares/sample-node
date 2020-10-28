//custom middleware
function log(req, res, next) {
    //just for demonstration
    //console.log('Logging...');
    next();
};

module.exports = log;