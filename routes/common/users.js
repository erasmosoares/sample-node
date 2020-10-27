const { User, validate } = require('../../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');

// protecting routes
const auth = require('../../middleware/auth');

//try catch middleware
const asyncMiddleware = require('../../middleware/async');

/* endpoint for tests purpose*/
router.get('/', auth, asyncMiddleware(async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
}));

router.get('/me', auth, asyncMiddleware(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
}));

router.post('/', asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    /* Hashing the password */
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    /* Add token to the header */
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
}));

module.exports = router;