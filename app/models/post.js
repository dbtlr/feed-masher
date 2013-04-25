var mongoose = require('mongoose')
  , database = require('./database') 
  , Schema   = mongoose.Schema
  , Mixed    = Schema.Types.Mixed;

var postSchema = new Schema({
    originalId  : String
  , type        : String
  , date        : Date
  , title       : String
  , body        : String
  , url         : String
  , meta        : Mixed
});

postSchema.index({ originalId: 1, type: 1, date: 1 });
postSchema.set('autoIndex', false);

postSchema.methods.saveOne = function() {
  var post = this;
  this.model('Post').findOne({ originalId: this.originalId }, function (error, item) {
    if (error) {
      throw new Error(error);
    }

    if (item) return;

    console.log('Recording ' + post.type + ' post #' + post.originalId);
    post.save();
  });
}

module.exports = database.model('Post', postSchema);