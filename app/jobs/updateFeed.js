var twitter = require('../models/service/twitter.js')
  , tumblr  = require('../models/service/tumblr.js');

exports.run = function() {
  twitter.update();
  tumblr.update();
}