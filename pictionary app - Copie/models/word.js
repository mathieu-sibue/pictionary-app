const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
    word: String,
    description: String,
    author: String, //username or id ?
    createdAt: Date
});

const Word = mongoose.model('Word', WordSchema);

module.exports = Word