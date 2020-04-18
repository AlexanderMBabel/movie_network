const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
  firstName: String,
  lastName: String,
  bio: String,
  profileImage: String,
  intrests: String,
  birthDate: String,
  country: String
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Users', userSchema);
