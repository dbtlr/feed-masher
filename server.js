var environment = require('./config/environment')
  , jobsPath = __dirname + '/app/jobs'
  , argv = require('optimist')
      .usage('Start local server environment')
      .argv
;

console.log('Loading Feed Process Server');

environment.process();

argv._.forEach(function(option) {
  switch (option) {
    case 'update':
      require(jobsPath + '/updateFeed').run();
      break;
  }
});
