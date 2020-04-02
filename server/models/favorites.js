const mongoose = require('mongoose');

const favoritiesSchema = mongoose.Schema({
  user_id: String,
  movie: String
});

module.exports = mongoose.model('Favorites', favoritiesSchema);
