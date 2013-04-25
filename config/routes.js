var index = require('../app/controllers/index');

module.exports.handler = function(app) {
    app.get('/', index.home);
};