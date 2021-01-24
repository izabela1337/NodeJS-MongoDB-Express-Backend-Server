module.exports = function(app) {
    const comments = require('../controllers/comments.controller.js');

    //Add
    app.post('/api/comments/add', comments.create);
    //Fetch all
    app.get('/api/comments', comments.findAll);
    //Fetch comments that belong to specified parent(article)
    app.get('/api/comments/:parentID', comments.findFromParent);
}