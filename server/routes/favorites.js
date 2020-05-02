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
   Add a favorite 
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
    
  } catch (error) {
    res.json(error);
  }

  if (findExisting.length < 1) {
    try {
      await favorite.save();

      res.json(`Favorite ${id} added`);
    } catch (err) {
      res.status(401).json({
        msg: err.message
      });
    }
  } else {
    res.json('Already in favorites');
  }
});

/* @POST
   private
   remove a favorite by id and email
*/

router.post('/remove', auth, async (req, res) => {
  const { id } = req.body;
  try {
    const deleted = await Favorites.findOneAndDelete({
      email: req.email,
      id
    });
    console.log(deleted);
    res.json(`${id} deleted`);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
