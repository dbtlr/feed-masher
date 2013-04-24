var Twit = require('twit')
  , config = require('../../../config/services.json');

exports.update = function() {
  config.twitter.forEach(function(config) {
    var ts = new Twit(config.credentials);
  
    ts.get('statuses/user_timeline', { screen_name: config.screen_name, count: 10 }, function(err, reply) {
      reply.forEach(function(item) {
        console.log(item.text);
      });
    });
  });
};
