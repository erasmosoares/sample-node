const express = require('express');
const router = express.Router();

//try catch middleware
const asyncMiddleware = require('../../middleware/async');

//Loading template engine
router.get('/', asyncMiddleware((req, res) => {
    res.render('index', { title: 'Sample Template Engine', message: 'This is a tribute to my pug' });
}));

module.exports = router;