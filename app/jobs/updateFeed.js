var twitter = require('../models/service/twitter.js')
  , tumblr  = require('../models/service/tumblr.js');

module.exports.run = function() {
  twitter.update();
  tumblr.update();
}