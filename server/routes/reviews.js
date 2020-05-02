const express = require('express')
const router = express.Router()
const Reviews = require('../models/reviews')
const auth = require('../middleware/auth')

/* @ Get
   get all of current users reviews
   private
*/

router.get('/user', auth, async (req,res) => {
    console.log(req)

    try {
        const userReviews = await Reviews.find({
            email: req.email
        })
        res.json(userReviews)
    } catch (error) {
        res.status(401).json(error)
    }
})

/* @Get
   get all reviews by id
   public
*/

router.get('/id', async (req,res) => {
    try {
        const reviewsById = await Reviews.find({
            id: req.query.id
        }) 
        res.json(reviewsById)
    } catch (error) {
        console.error(error)
        res.status(401).json(error)
        
    }
})

/* @Get
   get review by email and id for updating
   private
*/

router.get('/', auth, async (req,res) => {
     try {
         const userReviewbyId = await Reviews.findOne({
             email: req.email,
             id: req.query.id
         })
         res.json(userReviewbyId)
     } catch (error) {
         console.error('error with find')
         res.status(401).json(error)
         
     }
})

/* @Post
   add review to db or update if exists
   private
*/

router.post('/', auth, async (req,res) => {
    const {review,id,title, rating} = req.body
    let existingReview
    let userReview = new Reviews({
        email: req.email,
        review,
        id,
        title,
        rating
    })

    // Check if review exists

    try {
        existingReview = await Reviews.findOne({
            email: req.email,
            id: id
        })

    } catch (error) {
        res.status(500).json(error)
        
    }

    if(existingReview){
        try {
            await Reviews.findOneAndUpdate({
                email: req.email,
                id: id
            }, {review, title, rating}, {upsert: true})
        } catch (error) {
            console.error(error)
            res.status(401).json('error')
        }
    }else{
        try {
            await userReview.save()
            res.json('Review Saved')
        } catch (error) {
            console.error(error)
            res.status(401).json(error)
        }
    }

    
    
})

router.delete('/' , auth, async (req,res) => {
    const {title} = req.body

    try {
        await Reviews.findOneAndDelete({
            email: req.email,
            title
        })
    } catch (error) {
        console.error('could not delete')
        res.status(401).json(error.message)
        
    }
})

module.exports = router