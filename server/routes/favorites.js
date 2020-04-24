const express = require('express');
const router = express.Router();
const Favorites = require('../models/favorites');
const auth = require('../middleware/auth');

/* @Get
   Private
   Get all favorites with email
*/

router.get('/', auth, async (req, res) => {
  try {
    const favorites = await Favorites.find({
      email: req.email
    });
    res.json(favorites);
  } catch (error) {
    res.status(500).json('Server Error');
  }
});

/* @Post
   Private
   Add a favorite id ,type, and email
*/

router.post('/', auth, async (req, res) => {
  const { id, type, title, post, image } = req.body;
  console.log(req.body);

  let favorite = new Favorites({
    email: req.email,
    id,
    type,
    title,
    post,
    image
  });
  let findExisting = null;

  try {
    findExisting = await Favorites.find({
      email: req.email,
      id: id
    });
    console.log(findExisting.length);
  } catch (error) {
    res.json(error);
  }

  if (findExisting.length < 1) {
    try {
      await favorite.save();
      console.log('added');
      res.json(`Favorite ${id} added`);
    } catch (err) {
      res.status(401).json({
        msg: err.message
      });
    }
  } else {
    console.log('already in favor');
    res.json('Already in favorites');
  }
});

module.exports = router;
