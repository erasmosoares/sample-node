const { Book, validate } = require('../models/books');
const express = require('express');
const multer = require("multer");
const imageResize = require("../middleware/imageResize");
const router = express.Router();
const config = require("config");
const bookMapper = require("../mappers/books");
const winston = require('winston');

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
        upload.array("images", config.get("maxImageCount")),
        imageResize
      ], auth, async (req, res) => {
        const { error } = validate(req.body);
        if (error){
            winston.info(`Error adding book ${req.body.name }:', ${error.details[0].message}`);
            return res.status(400).send("An unexpected error occurred");
        } 
    
        if(error instanceof multer.MulterError) return res.status(500).send("A Multer error occurred when uploading");
    
        const book = new Book({ name: req.body.name });
        
        // Only process images if they are uploaded
        if (req.files && req.files.length > 0) {
            book.images = req.files.map((file) => ({ fileName: file.filename }));
        }
    
        await book.save();
        res.send(book);
    });

  router.put('/:id', [auth, validateObjectId], async (req, res) => {
    try {
      // Validate the request body
      const { error } = validate(req.body);
      if (error) {
        winston.info(`Error updating book ${req.params.id}:', ${error.details[0].message}`);
        return res.status(400).type('text').send('Error updating book');
      }
  
      // Update the book by ID
      const book = await Book.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name, images: req.body.images },
        { new: true }
      );
  
      // Check if the book was found
      if (!book) {
        winston.info(`Error updating book ${req.params.id}`);
        return res.status(404).type('text').send('The book with the given ID was not found.');
      }
  
      // Send the updated book as JSON
      res.type('json').send(book);
    } catch (err) {
      // Handle unexpected errors
      winston.error('Error updating book:', err);
      res.status(500).type('text').send('An unexpected error occurred');
    }
  });

  router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
    try {
      // Delete the book by ID
      const book = await Book.findByIdAndDelete(req.params.id);
  
      // Check if the book was found
      if (!book) {
        winston.info(`Error deleting book ${req.params.id}`);
        return res.status(404).type('text').send('The book with the given ID was not found.');
      }
  
      // Send the deleted book as JSON
      res.type('json').send(book);
    } catch (err) {
      // Handle unexpected errors
      winston.error('Error deleting book:', err);
      res.status(500).type('text').send('An unexpected error occurred');
    }
  });

  router.get('/:id', validateObjectId, async (req, res) => {
    try {
      // Find the book by ID
      const book = await Book.findById(req.params.id);
  
      // Check if the book was found
      if (!book) {
        winston.info(`Error deleting book ${req.params.id}:`);
        return res.status(404).type('text').send('The book with the given ID was not found.');
      }
  
      // Map the book to the desired format
      const resource = bookMapper(book);
  
      // Send the book data as JSON
      res.type('json').send(resource);
    } catch (err) {
      // Handle unexpected errors
      winston.error('Error retrieving book:', err);
      res.status(500).type('text').send('An unexpected error occurred');
    }
  });

module.exports = router;