const { User } = require('../../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const winston = require('winston');

router.post('/', async (req, res) => {
    try {
      // Validate request body
      const { error } = validate(req.body);
      if (error) {
        winston.info(`Error during authentication: ${rreq.body.email }:', ${error.details[0].message}`);
        return res.status(400).type('text').send('Error during authentication');
      }
  
      // Find user by email
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).type('text').send('Invalid email or password.');
      }
  
      // Verify password
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(400).type('text').send('Invalid email or password.');
      }
  
      // Generate a JSON Web Token
      const token = user.generateAuthToken();
      res.status(200).type('json').send(token);
    } catch (err) {
      // Handle unexpected errors
      winston.error('Error during login:', err);
      res.status(500).type('text').send('An unexpected error occurred');
    }
});

const Joi = require('joi');

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(10).max(30).required()
    });

    return schema.validate(req);
}

module.exports = router;