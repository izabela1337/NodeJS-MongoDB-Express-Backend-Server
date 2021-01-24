const article = require('../models/article.model.js');
let fs = require('fs');

//Add article
//todo
exports.create = (req, res) => {
    //read body of post request
    const NewArticle = new article({
        ID: req.body.ID,
        title: req.body.title,
        body: req.body.body,
        tags: req.body.tags,
        date: req.body.date
    });
    //Save to Mongo 
    NewArticle.save()
    .then(data =>{
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
//Fech all articles
exports.findAll = (req, res) => {
    article.find()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
//Find one article by it's ID
exports.findOne = (req, res) => {
    let id = Number(req.params.ArticleID);
    if(isNaN(id))
        id = 0;
    article.findOne({$query: {ID: parseInt(id)}}).then((result) =>{
        res.send(result);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
//Search articles
exports.find = (req, res) => {
    let query = req.params.query;
    query = query.replace(/[\'\\\"\<\>]/g, '');
    article.find({$or: [{tags: {$in: query}}, 
        {title: {$in: query}}, 
        {body: {$in: query}}    
        ]})
        .then(result => {
            res.send(result);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};