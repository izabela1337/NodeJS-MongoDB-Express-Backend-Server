const Comments = require('../models/comments.model.js');

exports.create = (req, res) => {
    //Add
    const comment = new Comments({
        text: req.body.text,
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
//Fech all comments
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