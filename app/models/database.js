var mongoose = require('mongoose')
  , db = mongoose.connect('localhost', 'feed-masher-nodrew', 27017);

db.connection.on('error', console.error.bind(console, 'connection error:'));

module.exports = db;

