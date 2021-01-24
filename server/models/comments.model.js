const mongoose = require('mongoose');

//Schemas
const commentScheme = mongoose.Schema({
    author: String,
    body: String,
    createdAt: Object 
});

module.exports = mongoose.model('comments', commentScheme);