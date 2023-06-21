import mongoose from 'mongoose';
const schema = mongoose.Schema({
  tuit: String,
  likes: Number,
  liked: Boolean,
  username: String,
  time: String,
  retuits: Number,
  replies: Number,
  disliked: Boolean,
  dislikes: Number,
}, {collection: 'tuits'});
export default schema;