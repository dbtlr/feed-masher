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
  var item = this;
  this.model('Post').findOne({ originalId: this.originalId }, function (error, m_item) {
    if (error) {
      throw new Error(error);
    }

    if (m_item) return;

    console.log('Recording ' + item.type + ' post #' + item.originalId);
    item.save();
  });
}

module.exports = database.model('Post', postSchema);