var mongoose = require('mongoose')
  , db = mongoose.connect('localhost', 'feed-masher-nodrew', 27017);

db.connection.on('error', console.error.bind(console, 'connection error:'));

// Not sure why the database connection needs to be closed this way.
// Todo: This is not a clean way to do this. Fix that.
setTimeout(function() {
  mongoose.connection.close();
}, 5000);

module.exports = db;

