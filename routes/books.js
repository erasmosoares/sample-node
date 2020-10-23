const express = require('express');
const router = express.Router();
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

router.get('/', async (req, res) => {
    const books = await Book.find().sort('name');
    res.send(books);
});

router.post('/', async (req, res) => {
    const { error } = validateBook(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let book = new Book({ name: req.body.name });
    book = await book.save();
    res.send(book);
});

router.put('/:id', async (req, res) => {
    const { error } = validateBook(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const book = await Book.findOneAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    if (!book) return res.status(404).send('The book with the given ID was not found.');

    res.send(book);
});

router.delete('/:id', async (req, res) => {
    const book = await Book.findOneAndDelete(req.params.id);
    if (!book) return res.status(404).send('The book with the given ID was not found.');

    res.send(book);
});

router.get('/:id', async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send('The book with the given ID was not found.');
    res.send(book);
});

module.exports = router;