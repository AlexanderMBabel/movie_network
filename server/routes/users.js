var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const Users = require('../models/users');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const path = require('path');

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

router.post(
  '/',
  [
    check('email')
      .isEmail()
      .isEmpty()
      .not(),
    check('password')
      .isLength({ min: 6 })
      .isEmpty()
      .not()
  ],
  async (req, res) => {
    const { email, password } = req.body;

    // Check is email is unique

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
      console.table(error.name);
      // if (error.code === 11000) {
      //   res.status(401).json({
      //     errors: [
      //       {
      //         msg: 'Please enter a different email adress, Email already exists'
      //       }
      //     ]
      //   });
      // }

      res.status(401).json({
        msg: error.message
      });
    }
  }
);

/*
@ Post 
  Private
  Upload an image and store location in db
*/
router.post('/upload', auth, async (req, res) => {
  if (req.files === null) {
    console.log(req);
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  const file = req.files.image;
  const userEmail = req.email;
  const user = userEmail.split('@')[0];

  console.log(file);

  const imagePath = path.join(__dirname, '..', '/public/profile_images/', `profileImage${user}${file.mimetype === 'image/png' ? '.png' : '.jpg'}`);
  file.mv(imagePath, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  });

  Users.findOneAndUpdate({ email: req.email }, { profileImage: imagePath }, { upsert: true }, (err, doc) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json({ fileName: file.name, filePath: imagePath });
  });
});

/*
@ Post 
  Private
  Update user profile info
*/
router.post('/profile', auth, (req, res) => {
  console.log(req);
  Users.findOneAndUpdate({ email: req.email }, req.body, { upsert: true }, (err, doc) => {
    if (err) {
      // console.error(err);
      return res.status(500).json(err);
    }
    res.json('Profile Successfully updated');
  });
});
module.exports = router;
