const mongoose = require('mongoose');

let PostModel = {};

const PostSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  mainBody: {
    type: String,
    required: true,
  },
  poster: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

PostSchema.statics.toAPI = (doc) => ({
  username: doc.username,
  mainBody: doc.mainBody,
});

// searches with id
PostSchema.statics.findByPoster = (_id, callback) => {
  PostModel.find({ poster: _id }).select('username mainBody poster').lean().exec(callback);
};

// returns all posts
PostSchema.statics.findAll = (callback) => {
  PostModel.find({}).select('username mainBody poster').lean().exec(callback);
};

// deletes a single post
PostSchema.statics.deletePost = (_id, callback) => {
  PostModel.find({ _id }).deleteOne().exec(callback);
};

PostModel = mongoose.model('Post', PostSchema);
module.exports = PostModel;
