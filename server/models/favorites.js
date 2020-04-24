const mongoose = require('mongoose');

const favoritiesSchema = mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  type: String,
  email: {
    type: String,
    required: true
  },
  image: String,
  title: {
    type: String,
    required: true
  },
  plot: String
});

module.exports = mongoose.model('Favorites', favoritiesSchema);
