var mongoose = require('mongoose');

var SentenceSchema = new mongoose.Schema({
  text: String,  
  parent: {type: Schema.Types.ObjectId, ref: 'Sentence'}
});

module.exports = mongoose.model('Sentence', SentenceSchema);
