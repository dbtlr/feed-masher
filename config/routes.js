var index = require('../app/controllers/index');

exports.handler = function(app) {
    app.get('/', index.home);
};