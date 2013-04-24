var twitter = require('../models/service/twitter.js');

exports.run = function() {
  twitter.update();
}