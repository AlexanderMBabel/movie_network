const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
require('dotenv').config();

/* @post
   Login user
*/

router.post('/', async (req, res) => {
  try {
    const user = await Users.find({
      email: req.email
    }).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});
