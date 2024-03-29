var Twit = require('twit')
  , config = require('../../../config/services.json')
  , Post = require('../post');

module.exports.update = function() {
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
          originalId: item.id,
          date: item.created_at,
          type: 'twitter',
          body: item.text,
          url: 'http://twitter.com/' + item.user.screen_name + '/status/' + item.id,
          meta: { source: item.source }
        };

        var post = new Post(data);
        post.saveOne();
      });
    });
  });
};
