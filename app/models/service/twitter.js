var Twit = require('twit')
  , config = require('../../../config/services.json');

exports.update = function() {
  if (typeof config.twitter == 'undefined') {
    return;
  }

  config.twitter.forEach(function(config) {
    var ts = new Twit(config.credentials);

    ts.get('statuses/user_timeline', { screen_name: config.screen_name, count: 10 }, function(err, reply) {
      if (err != null) {
        console.log('There was an error pull posts from Twitter for ' + config.screen_name);
        console.log(err);
        return;
      }
      reply.forEach(function(item) {
        var data = {
          original_id: item.id,
          text: item.text,
          source: item.source,
          url: 'http://twitter.com/' + item.user.screen_name + '/status/' + item.id,
        };
        
        // Todo: save data to Mongo, when a status is new.
      });
    });
  });
};
