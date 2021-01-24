const fs = require('fs');

exports.getConfig = (req, res) => {
    let data = JSON.parse(fs.readFileSync('../config/meta.json'));
    res.send(data);
}