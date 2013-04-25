var mongoose = require('mongoose');

var db = mongoose.connect('localhost', 'feed-masher-nodrew', 27017, { server: { auto_reconnect: false } });
db.connection.on('error', console.error.bind(console, 'connection error:'));

module.exports = db;

