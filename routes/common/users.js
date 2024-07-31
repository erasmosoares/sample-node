const { User, validate } = require('../../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const winston = require('winston');

// protecting routes
const auth = require('../../middleware/auth');

/* endpoint for tests purpose*/
router.get('/', auth, async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
});

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/', async (req, res) => {
    try {
      // Validate request body
      const { error } = validate(req.body);
      if (error) {
        return res.status(400).type('text').send('Error connecting user');
      }
  
      // Check if user already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).type('text').send('User already registered.');
      }
  
      // Create a new user
      user = new User(_.pick(req.body, ['name', 'email', 'password']));
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
  
      // Save the user
      await user.save();
  
      // Generate an authentication token
      const token = user.generateAuthToken();
  
      // Set the token in the response header and send user details
      res.header('x-auth-token', token).type('json').send(_.pick(user, ['_id', 'name', 'email']));
    } catch (err) {
      // Handle unexpected errors
      winston.error('Error authenticating user:', err);
      res.status(500).type('text').send('An unexpected error occurred');
    }
  });

module.exports = router;