const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  id: String,
  movie: String,
  rating: String,
  title: String,
  review: {
    type: Object,
    required: true
  } 
});

module.exports = mongoose.model('Reviews', reviewSchema);
