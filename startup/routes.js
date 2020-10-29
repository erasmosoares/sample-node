const home = require('../routes/common/home');
const users = require('../routes/common/users');
const auth = require('../routes/common/auth');
const books = require('../routes/books');

module.exports = function (app) {

    app.use('/', home);
    app.use('/api/books', books);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
}