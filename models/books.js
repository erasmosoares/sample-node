/**
 * Define Mongoose Model Schema
 */
const mongoose = require('mongoose');
const Book = mongoose.model('Books', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));

/**
 * The most powerful schema description language and data 
 * validator for JavaScript.
 */
const Joi = require('joi');
function validateBook(book) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required()
    });

    return schema.validate(book);
}

exports.Book = Book;
exports.validate = validateBook;