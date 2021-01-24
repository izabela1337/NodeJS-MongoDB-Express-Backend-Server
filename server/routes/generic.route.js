module.exports = function(app) {
    const comments = require('../controllers/comments.controller.js');

    //Add
    app.post('/api/commentadd', comments.create);
    //Fetch all
    app.get('/api/comment', comments.findAll);
}