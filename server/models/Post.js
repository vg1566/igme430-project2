const mongoose = require('mongoose');
// const _ = require('underscore');

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

// To-do: findByPoster

PostSchema.statics.findAll = (callback) => {
  PostModel.find({}).select('username mainBody').lean().exec(callback);
};

PostModel = mongoose.model('Post', PostSchema);
module.exports = PostModel;
