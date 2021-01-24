const mongoose = require('mongoose');

//Schemas
const articleScheme = mongoose.Schema({
    ID: Number,
    title: String,
    body: String,
    tags: Array,
    date: Object
});

module.exports = mongoose.model('article', articleScheme);