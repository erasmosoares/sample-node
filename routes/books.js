const express = require('express');
const router = express.Router();
/**
 * The most powerful schema description language and data 
 * validator for JavaScript.
 */
const Joi = require('joi');

const books = [
    { id: 1, name: 'Clean Architecture' },
    { id: 2, name: 'FactFulness' },
    { id: 3, name: 'The Pragmatic Programmer' },
];

router.get('/', (req, res) => {
    res.send(books);
});

router.post('/', (req, res) => {
    const { error } = validateBook(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const book = {
        id: books.length + 1,
        name: req.body.name
    };
    books.push(book);
    res.send(book);
});

router.put('/:id', (req, res) => {
    const book = books.find(c => c.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('The book with the given ID was not found.');

    const { error } = validateBook(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    book.name = req.body.name;
    res.send(book);
});

router.delete('/:id', (req, res) => {
    const book = books.find(c => c.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('The book with the given ID was not found.');

    const index = books.indexOf(book);
    books.splice(index, 1);

    res.send(book);
});

router.get('/:id', (req, res) => {
    const book = books.find(c => c.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('The book with the given ID was not found.');
    res.send(book);
});

function validateBook(book) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(book);
}

module.exports = router;