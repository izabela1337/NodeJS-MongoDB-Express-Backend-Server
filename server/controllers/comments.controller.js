const Comments = require('../models/comments.model.js');

exports.create = (req, res) => {
    //Add
    const comment = new Comments({
        parent: req.body.parent,
        author: req.body.author,
        body: req.body.body,
        createdAt: new Date()
    });
    //Save to db
    comment.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
//Fetch all comments
exports.findAll = (req, res) => {
    Comments.find()
    .then(comment => {
        res.send(comment);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
//Fetch all comments that belong to a parent
exports.findFromParent = (req, res) => {
    let id = Number(req.params.parentID);
    if(isNaN(id))
        id = 0;
    Comments.find({$query: {parent: parseInt(id)}})
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    })
}