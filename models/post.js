const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true 
  },
  body: {
    type: String,
    required: true 
  },
  author: {
    type: String,
    required: true 
  },
  date: {
    type: Date,
    default: Date.now 
  },
})

const Post = mongoose.model('posts', postSchema);

module.exports = Post;