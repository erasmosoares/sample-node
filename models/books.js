const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
})
const Book = mongoose.model('Books', bookSchema);


const Joi = require('joi');

/* Used to validate the IDs, Joi.objectId()*/
Joi.objectId = require('joi-objectid')(Joi);

function validateBook(book) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required()
    });

    return schema.validate(book);
}

exports.Book = Book;
exports.validate = validateBook;