const { Book, validate } = require('../models/books');
const express = require('express');
const multer = require("multer");
const imageResize = require("../middleware/imageResize");
const router = express.Router();
const config = require("config");
const bookMapper = require("../mappers/books");


const upload = multer({
    dest: "uploads/",
    limits: { fieldSize: 25 * 1024 * 1024 },
  });

// protecting routes
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// validating Idsq
const validateObjectId = require('../middleware/validateObjectId');


router.get('/', async (req, res) => {
    const books = await Book.find().sort('name');
    const resources = books.map(bookMapper)
    res.send(resources);
});

router.post('/',
[
    // Order of these middleware matters.
    // "upload" should come before other "validate" because we have to handle
    // multi-part form data. Once the upload middleware from multer applied,
    // request.body will be populated and we can validate it. This means
    // if the request is invalid, we'll end up with one or more image files
    // stored in the uploads folder. We'll need to clean up this folder
    // using a separate process.
    // auth,
    upload.array("images", config.get("maxImageCount")),
    imageResize,
  ], auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if(error instanceof multer.MulterError) return res.status(500).send("A Multer error occurred when uploading");

    const book = new Book({ name: req.body.name });
    
    book.images = req.images.map((fileName) => ({ fileName: fileName }));

    await book.save();
    res.send(book);
});

router.put('/:id', [auth, validateObjectId], async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const book = await Book.findByIdAndUpdate(req.params.id, { name: req.body.name, images: req.body.images }, { new: true });
    if (!book) return res.status(404).send('The book with the given ID was not found.');

    res.send(book);
});

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
    const book = await Book.findByIdAndRemove(req.params.id);
    if (!book) return res.status(404).send('The book with the given ID was not found.');

    res.send(book);
});

router.get('/:id', validateObjectId, async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send('The book with the given ID was not found.');
    const resource = bookMapper(book);
    res.send(resource);
});

module.exports = router;