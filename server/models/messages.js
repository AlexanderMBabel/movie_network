const mongoose = require('mongoose');

messagesSchema = mongoose.Schema({
  user_id: String,
  sender: String,
  title: String,
  body: String
});

module.exports = mongoose.model('Messages', messagesSchema);
