const mongoose = require('../database/connection');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    unique: true,
  },

  author: {
    type: String,
    require: true,
  },
  
  year: {
    type: Number,
    require: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;