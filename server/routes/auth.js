const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
require('dotenv').config();

router.get('/', auth, async (req, res) => {
  try {
    const user = await Users.find({
      email: req.email
    }).select('-password');

    res.json(user);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

/* @post
   Login user
*/

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  let userInfo = null;

  try {
    userInfo = await Users.find({
      email: email
    }).select('email password');
    const passwordMatch = bcrypt.compareSync(password, userInfo[0].password);
    const payload = {
      email: userInfo[0].email,
      admin: false
    };
    if (passwordMatch) {
      jwt.sign(payload, process.env.SECRET, { algorithm: 'HS256', expiresIn: 4000 }, (err, token) => {
        if (err) {
          res.status(401).json(err);
        } else {
          console.log(token);
          res.json({
            token
          });
        }
      });
    }
  } catch (error) {
    res.status(401).json('email doesnt exist');
  }
});

module.exports = router;
