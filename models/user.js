/**
 * Define Mongoose Model Schema
 */
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean
})

const jwt = require('jsonwebtoken');
const config = require('config');

// add method to the user object
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'), { expiresIn: '1h' });
    return token;
}

const User = mongoose.model('User', userSchema);

/**
 * The most powerful schema description language and data 
 * validator for JavaScript.
 */
const Joi = require('joi');

/* Used to validate the IDs, Joi.objectId()*/
Joi.objectId = require('joi-objectid')(Joi);

/* Validate password complexity */
const passwordComplexity = require("joi-password-complexity");

const complexityOptions = {
    min: 10,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2,
};


function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: passwordComplexity(complexityOptions).required()
    });

    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;