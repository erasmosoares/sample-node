const express = require('express');
const router = express.Router();

//Loading template engine
router.get('/', (req, res) => {
    res.render('index', { title: 'Sample Template Engine', message: 'This is a tribute to my pug' });
});

module.exports = router;