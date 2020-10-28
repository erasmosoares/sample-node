const { User } = require('../../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    /* Re-hash the password and compare*/
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    /* Generate a json web token */
    const token = user.generateAuthToken();
    res.send(token);
});

/**
 * The most powerful schema description language and data 
 * validator for JavaScript.
 */
const Joi = require('joi');

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(10).max(30).required()
    });

    return schema.validate(req);
}

module.exports = router;