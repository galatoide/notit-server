const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const post = {
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
   imageName: { 
      type: String, 
      // required: true 
   },
   imageDescription: { 
      type: String, 
      // required: true 
   },
   imageUrl: { 
      type: String, 
      // required: true 
   }
};

const PostSchema = new Schema(post);

module.exports = mongoose.model("posts", PostSchema);