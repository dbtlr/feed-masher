var tumblr = require('tumblr.js')
  , extend = require('node.extend')
  , S = require('string')
  , config = require('../../../config/services.json');

function PostProcessor() {}

exports.update = function() {
  var processor = new PostProcessor();

  if (typeof config.tumblr == 'undefined') {
    return;
  }

  config.tumblr.forEach(function(config) {
    var client = tumblr.createClient(config.credentials);
    client.posts(config.blog, { limit: 1 }, function(err, response) {
      response.posts.forEach(function(post) {
        if (post.state != 'published') return;

        data = processor.process(post);
        // Todo: save to mongo.
      });
    });
  });
}

PostProcessor.prototype = {
  process: function(post) {
    var data = {
      original_id: post.id,
      date: post.date, // post.timestamp
      url: post.post_url,
      type: 'tumblr',
      meta: {
        format: post.format,
        reblog_key: post.reblog_key,
        tags: post.tags,
        type: post.type,
        source_url: post.source_url,
        source_title: post.source_title
      }
    }

    switch (post.type) {
      case 'text':
        data = extend(true, data, this.processAsText(post));
        break;
      case 'photo':
        data = extend(true, data, this.processAsPhoto(post));
        break;
      case 'video':
        data = extend(true, data, this.processAsVideo(post));
        break;
      case 'audio':
        data = extend(true, data, this.processAsAudio(post));
        break;
      case 'link':
        data = extend(true, data, this.processAsLink(post));
        break;
      case 'quote':
        data = extend(true, data, this.processAsQuote(post));
        break;
      case 'chat':
        data = extend(true, data, this.processAsChat(post));
        break;
      case 'answer':
        data = extend(true, data, this.processAsAnswer(post));
        break;

      default:
        console.log('Unknown post type ' + post.type + ' found.');
    }

    return data;
  },

  processAsText: function(post) {
    var data = {
      title: post.title,
      body: post.body,
      raw_body: S(post.body).stripTags().s
    };

    return data;
  },

  processAsPhoto: function(post) {
    var data = {
      title: '',
      body: post.caption,
      raw_body: S(post.caption).stripTags().s,
      meta: {
        thumbnail_url: '',
        thumbnail_width: '',
        thumbnail_width: '',
        photos: post.photos
      }
    };

    // Todo: Add default photo size finder.
    return data;
  },

  processAsVideo: function(post) {
    var data = {
      title: '',
      body: post.caption,
      raw_body: S(post.caption).stripTags().s,
      meta: {
        thumbnail_url: post.thumbnail_url,
        thumbnail_width: post.thumbnail_width,
        thumbnail_width: post.thumbnail_width,
        permalink_url: post.permalink_url,
        html5_capable: post.html5_capable,
        player: post.player
      }
    };

    return data;
  },

  processAsAudio: function(post) {
    var data = {
      title: '',
      body: post.caption,
      raw_body: S(post.caption).stripTags().s,
      meta: {
        source_url: post.source_url,
        source_title: post.source_title,
        id3_title: post.id3_title,
        html5_capable: post.html5_capable,
        player: post.player,
        thumbnail_url: post.album_art || null,
        artist: post.artist || null,
        album: post.album || null,
        track_name: post.track_name || null,
        track_number: post.track_number || null,
        year: post.year || null
      }
    };

    return data;
  },

  processAsLink: function(post) {
    var data = {
      title: post.title,
      body: post.description,
      raw_body: S(post.description).stripTags().s,
      meta: { link_url: post.url }
    };

    return data;
  },

  processAsQuote: function(post) {
    var data = {
      title: '',
      body: post.text,
      raw_body: S(post.text).stripTags().s,
      meta: { source: post.source, source_url: post.source_url, source_title: post.source_title }
    };

    return data;
  },

  processAsChat: function(post) {
    var data = {
      title: post.title,
      body: post.body,
      raw_body: S(post.body).stripTags().s,
      meta: { dialogue: post.dialogue }
    };

    return data;
  },

  processAsAnswer: function(post) {
    var data = {
      title: post.question,
      body: post.answer,
      raw_body: S(post.answer).stripTags().s,
      meta: { asking_name: post.asking_name, asking_url: post.asking_url }
    };

    return data;
  }
};
