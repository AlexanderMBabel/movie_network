var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const Users = require('../models/users');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/* @Get
   Get users by email
*/

router.get('/', async (req, res) => {
  try {
    const userEmail = await Users.find({
      email: req.query.email
    }).select('-password');
    res.json(userEmail);
  } catch (error) {
    console.log(error);
  }
});

/*
  @Post
  Sign up a user
*/

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  console.log(password);
  let hashPassword = null;
  if (password) {
    hashPassword = bcrypt.hashSync(password, 8);
    // bcrypt.hash('password', 8, (err, hash) => {
    //   if (!err) {
    //     hashPassword = hash;
    //   } else {
    //     console.log(err);
    //   }
    // });
  }
  let users = new Users({
    email: email,
    password: hashPassword
  });
  try {
    await users.save();
    const payload = {
      email: email,
      admin: false
    };
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        algorithm: 'HS256',
        expiresIn: 40000
      },
      (err, token) => {
        if (err) {
          res.status(401).json({
            errors: [
              {
                msg: 'could not sign token'
              }
            ]
          });
        } else {
          res.json({
            token
          });
        }
      }
    );
  } catch (error) {
    console.log(error.message);
    if (error.code === 11000) {
      res.json({
        errors: [
          {
            msg: 'Please enter a different email adress, Email already exists'
          }
        ]
      });
    }
    if (error.name === 'validationError') {
      res.json({
        errors: [
          {
            msg: error.message
          }
        ]
      });
    }
  }
});

module.exports = router;
