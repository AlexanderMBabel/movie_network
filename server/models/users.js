const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  bio: String,
  profileImage: String
});

module.exports = mongoose.model('Users', userSchema);
