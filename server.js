var environment = require('./config/environment')
  , jobsPath = __dirname + '/app/jobs'
  , mongoose = require('mongoose')
  , argv = require('optimist').argv;

console.log('Loading Feed Process Server');

environment.process();

argv._.forEach(function(option) {
  switch (option) {
    case 'update':
      require(jobsPath + '/updateFeed').run();
      break;
  }
});

// Not sure why the database connection needs to be closed this way.
// Todo: This is not a clean way to do this. Fix that.
setTimeout(function() {
  mongoose.connection.close();
}, 7000);
