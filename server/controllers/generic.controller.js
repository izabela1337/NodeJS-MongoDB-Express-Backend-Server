const fs = require('fs');

exports.getConfig = (req, res) => {
    let data = JSON.parse(fs.readFileSync('./server/config/meta.json'));
    res.send(data);
}

exports.getLicence = (req, res) => {
    let data = JSON.parse(fs.readFileSync('./server/config/licence.json'));
    res.send(data);
}