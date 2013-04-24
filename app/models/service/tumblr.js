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
    client.posts(config.blog, { limit: 20 }, function(err, response) {
      response.posts.forEach(function(post) {
        if (post.state != 'published') return;

        data = processor.process(post);
        console.log(data);
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
        data = extend(data, this.processAsText(post));
        break;
      case 'photo':
        data = extend(data, this.processAsPhoto(post));
        break;
      case 'video':
        data = extend(data, this.processAsVideo(post));
        break;
      case 'audio':
        data = extend(data, this.processAsAudio(post));
        break;
      case 'link':
        data = extend(data, this.processAsLink(post));
        break;
      case 'quote':
        data = extend(data, this.processAsQuote(post));
        break;
      case 'chat':
        data = extend(data, this.processAsChat(post));
        break;
      case 'answer':
        data = extend(data, this.processAsAnswer(post));
        break;

      default: 
        console.log('Unknown post type ' + post.type + ' found.');
    }

    return data;
  },
  
  processAsText: function(post) {
    return {
      title: post.title,
      body: post.body,
      raw_body: S(post.body).stripTags().s
    };
  },
  
  processAsPhoto: function(post) {
    // post.caption 
    // post.photos
      // post.photos[].caption
      // post.photos[].altsizes
        // post.photos[].altsizes[].height
        // post.photos[].altsizes[].width
        // post.photos[].altsizes[].url
    
  },
  
  processAsVideo: function(post) {
    // post.caption
    // post.permalink_url
    // post.thumbnail_url
    // post.thumbnail_width
    // post.thumbnail_height
    // post.html5_capable
    // post.player
      // post.player[].width
      // post.player[].embed_code
    
  },
  
  processAsAudio: function(post) {
    // post.source_url
    // post.source_title
    // post.id3_title
    // post.caption
    // post.player
  
    // Optional Audio ID3 Info
      // post.album_art
      // post.artist
      // post.album
      // post.track_name
      // post.track_number
      // post.year
    
  },
  
  processAsLink: function(post) {

    // post.title 
    // post.url 
    // post.description
  },
  
  processAsQuote: function(post) {
    // post.source_url
    // post.source_title
    // post.text
    // post.source
    
  },
  
  processAsChat: function(post) {
    // For Chat Posts
    // post.title
    // post.body
    // post.dialogue
      // post.dialogue[].label
      // post.dialogue[].name
      // post.dialogue[].phrase
    
  },
  
  processAsAnswer: function(post) {
    // post.asking_name
    // post.asking_url
    // post.question
    // post.answer
  }
};
