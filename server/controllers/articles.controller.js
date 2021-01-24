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
    let id = ID(req.params.ArticleID);
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
//Find multiple mangas (search)
exports.find = (req, res) => {
    let query = req.params.query;
    query = query.replace(/[\'\\\"\<\>]/g, '');
    Mangas.find({$or: [{tags: {$in: query}}, 
        {title: {$in: query}}, 
        {author: {$in: query}}, 
        {characters: {$in: query}}, 
        {series: {$in: query}}, 
        {translator: {$in: query}}]})
        .then(result => {
            res.send(result);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
}
//Find part of an array (/manga)
exports.findPart = (req, res) => {
    let reqArr = [];
    for(let i = 0; i < 6; i++){
        reqArr.push(6 * (parseInt(req.params.pageNumber) - 1) + i + 1);
    }
    console.log(reqArr);
    Mangas.find({$query: {number: {$in: reqArr}}}).then(result => {
        res.send(result)
    });
};
//Get icomming titles
exports.getIncomming = (req, res) => {
    let titlesInc = JSON.parse(fs.readFileSync('./server/meta/featured.json'))['titlesincoming'];
    res.send(titlesInc)
}
//Random Dic Entry
exports.getDic = (req, res) => {
    let jData = JSON.parse(fs.readFileSync('./server/meta/dic.json'));
    // let vals = Object.values(jData);
    // console.log(jData.Dics[0]);
    let randVal = jData.Dics[parseInt(Math.random() * Math.floor(9))];
    res.send(randVal);
}