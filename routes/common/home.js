const express = require('express');
const router = express.Router();

//try catch middleware
const asyncMiddleware = require('../../middleware/async');
/**
 * Loading template engine (Example using the custom asyncMiddleware
 * replaced by npm express-async-errors)
*/
//router.get('/', asyncMiddleware((req, res) => {
//    res.render('index', { title: 'Sample Template Engine', message: 'This is a tribute to my pug' });
//}));

router.get('/', (req, res) => {
    res.render('index', { title: 'Sample Template Engine', message: 'This is a tribute to my pug' });
});

module.exports = router;