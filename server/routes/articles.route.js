module.exports = function(app) {
    const articles = require('../controllers/articles.controller.js');

    //Add
    app.post('/api/AddArticle', articles.create);
    //Fetch all
    app.get('/api/GetAllArticles', articles.findAll);
    //view one
    app.get('/api/Articles/:ArticleID', articles.findOne);
    //search
    app.get('/api/ArticleSearch/:query', articles.find);
    //modify
    //todo
    //delete
    //todo
}