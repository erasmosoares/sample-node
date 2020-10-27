const { Book, validate } = require('../models/books');
const express = require('express');
const router = express.Router();

// protecting routes
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', async (req, res) => {
    const books = await Book.find().sort('name');
    res.send(books);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const book = new Book({ name: req.body.name });
    await book.save();
    res.send(book);
});

router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const book = await Book.findOneAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    if (!book) return res.status(404).send('The book with the given ID was not found.');

    res.send(book);
});

router.delete('/:id', [auth, admin], async (req, res) => {
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