module.exports = function(app) {
    const generic = require('../controllers/generic.controller.js');

    //get Confi
    app.get('/api/config', generic.getConfig);
    //get licence
    app.get('/api/licence', generic.getLicence);
}