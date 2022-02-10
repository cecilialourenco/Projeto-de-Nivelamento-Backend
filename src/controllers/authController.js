const express = require('express');

const Book = require('../models/book');

const router = express.Router();

router.post('/register', async(req, res) => {
  const { title } = req.body;

  try {

    if (await Book.findOne({ title }))
      return res.status(400).send({  error: 'Book already registered' })

    const book = await Book.create(req.body);

    book.title = undefined;
    
    return res.send({ book });
    
  }catch (error) {
    return res.status(400).send({ error: 'Registration failed' });
  }
});

router.get('/register', async(req, res) => {
  try {
    const books = await Book.find();

    res.status(200).json(books);
 
    return res.send({ book });
    
  }catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.get('/register/:id', async(req, res) => {
  const id = req.params.id;

  try {
    const book = await Book.findOne({ _id: id });

    if (!book) {
      res.status(422).json({ message: 'Book not found'});
      return
    }

    return res.status(200).json(book)
     
  }catch (error) {
    res.status(500).json({ error: error });
  }
})

router.patch('/register/:id', async(req, res) => {
  const id = req.params.id;

  const { title, author, year } = req.body;

  const book = {
    title, 
    author, 
    year,
  }

  try {
    const updatedBook = await Book.updateOne({ _id: id }, book);

    if(updatedBook.matchedCount === 0) {
      res.status(422).json({ message: 'Book not found'});
      return
    }
    return res.status(200).json(book);
     
  }catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete('/register/:id', async (req, res) => {
  const id = req.params.id;

  const book = await Book.findOne({ _id: id });


  if (!book) {

    res.status(422).json({ message: 'Book not found' });
    return
  }

  try {

    await Book.deleteOne({ _id: id });

    return res.status(200).json({ message: 'Book successfully removed' })

  }catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = app => app.use('/auth', router);