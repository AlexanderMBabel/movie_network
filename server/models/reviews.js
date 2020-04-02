const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  user_id: String,
  movie: String,
  rating: String,
  title: String,
  review: String
});

module.exports = mongoose.model('Reviews', reviewSchema);
