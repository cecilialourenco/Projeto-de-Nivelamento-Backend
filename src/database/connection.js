const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bookstore', { useNewUrlParser: true});

mongoose.Promise = global.Promise;

module.exports = mongoose;