module.exports = function(app) {
    const generic = require('../controllers/generic.controller.js');

    //Add
    app.get('/api/config', generic.getConfig);
}