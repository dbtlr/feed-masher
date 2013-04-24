var tumblr = require('tumblr.js')
  , config = require('../../../config/services.json');

exports.update = function() {
  if (typeof config.tumblr == 'undefined') {
    return;
  }

  config.tumblr.forEach(function(config) {
    var client = tumblr.createClient(config.credentials);
    client.posts(config.blog, { type: 'audio', limit: 20 }, function(err, post) {
      // post.id
      // post.date
      // post.state == 'published'
      // post.timestamp
      // post.format
      // post.reblog_key
      // post.tags
      // post.post_url
      // post.type
      // post.source_url
      // post.source_title
      
      // For Text Posts
        // post.title
        // post.body
      
      // For Photo posts
        // post.caption 
        // post.photos
          // post.photos[].caption
          // post.photos[].altsizes
            // post.photos[].altsizes[].height
            // post.photos[].altsizes[].width
            // post.photos[].altsizes[].url
            
      
      // For Link posts
        // post.title 
        // post.url 
        // post.description
    
      // For Video Posts
        // post.caption
        // post.permalink_url
        // post.thumbnail_url
        // post.thumbnail_width
        // post.thumbnail_height
        // post.html5_capable
        // post.player
          // post.player[].width
          // post.player[].embed_code

      // For Audio Posts
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
  
      // For Chat Posts
        // post.title
        // post.body
        // post.dialogue
          // post.dialogue[].label
          // post.dialogue[].name
          // post.dialogue[].phrase
        
      // For Quote Posts
        // post.source_url
        // post.source_title
        // post.text
        // post.source
    
      // For Answer Posts
        // post.asking_name
        // post.asking_url
        // post.question
        // post.answer
      console.log(post);
    });
  });
}