const { Book, validate } = require('../models/books');
const express = require('express');
const router = express.Router();

// protecting routes
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

//try catch middleware
const asyncMiddleware = require('../middleware/async');

router.get('/', asyncMiddleware(async (req, res) => {
    try {
        const books = await Book.find().sort('name');
        res.send(books);
    } catch (error) {
        next(error);
    }
}));

router.post('/', auth, asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const book = new Book({ name: req.body.name });
    await book.save();
    res.send(book);
}));

router.put('/:id', auth, asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const book = await Book.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    if (!book) return res.status(404).send('The book with the given ID was not found.');

    res.send(book);
}));

router.delete('/:id', [auth, admin], asyncMiddleware(async (req, res) => {
    const book = await Book.findByIdAndRemove(req.params.id);
    if (!book) return res.status(404).send('The book with the given ID was not found.');

    res.send(book);
}));

router.get('/:id', asyncMiddleware(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send('The book with the given ID was not found.');
    res.send(book);
}));

module.exports = router;