const mongoose = require('mongoose');

//Schemas
const commentScheme = mongoose.Schema({
    parent: Number,
    author: String,
    body: String,
    createdAt: Object 
});

module.exports = mongoose.model('comments', commentScheme);