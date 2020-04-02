const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  user_id: String,
  location: String,
  title: String,
  post: String
});

module.exports = mongoose.model('Posts', postSchema);
