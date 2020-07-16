const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const passport = require("passport");
const validatePostInput = require("../../validation/post");

router.get('/', passport.authenticate("jwt", { session: false }), (req, res) => {
  Post.find({author: req.username})
    .then(posts => res.status(200).json(posts))
    .catch(err => 
      res
        .status(400)
        .json({user: 'Error fetching posts of logged in user'})
    )
})

router.get('/post/:id', (req, res) => {
  Post.find({ author: req.params.author})
    .then(posts => res.status(200).json(posts))
    .catch(err =>
      res
        .status(400)
        .json({author: 'Error fetching posts of specific author'})
    )
})

router.post('/create', passport.authenticate("jwt", { session: false }), (req, res) => {
  const author = req.user.username;
  const post = req.body;
  const {errors, isValid} = validatePostInput(post);

  if (!isValid) {
    return res.status(400).json(errors)
  }
  post.author = author;
  const newPost = new Post(post);
  newPost
    .save()
    .then(doc => res.json(doc))
    .catch(err => console.log({create: 'Error creating new post'}))
})

router.patch('/update(:id', passport.authenticate("jwt", { session: false }), (req, res) => {
  const author = req.user.username;
  const {errors, isValid} = validatePostInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const {title, body} = req.body;
  Post.findByIdAndUpdate(
    {author, _id: req.params.id},
    {$set: {title, body}},
    {new: true}
  )
    .then(doc => res.ststus(200).json(doc))
    .catch(err =>
      res.status(400).json({update: 'Error updating post'})
    );
})

router.delete('/delete/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
  const author = req.user.username;
  Post.findOneAndDelete({ author, _id: req.params.id})
    .then(doc => res.status(200).json(doc))
    .catch(err =>
      res.status(400).json({delete: 'Error deleting a post'})
    )
})

module.exports = router;