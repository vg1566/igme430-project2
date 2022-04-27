const models = require('../models');
const PostModel = require('../models/Post');

const { Post } = models;

// render app page with token
const mainPage = (req, res) => {
  res.render('app', { csrfToken: req.csrfToken() });
};

// try to save new post to server
const makePost = async (req, res) => {
  // check for bad data
  if (!req.body.mainBody) {
    return res.status(400).json({ error: 'Body text required' });
  }

  const postData = {
    username: req.session.account.username,
    mainBody: req.body.mainBody,
    poster: req.session.account._id,
  };

  // try to save to server
  try {
    const newPost = new Post(postData);
    await newPost.save();
    return res.status(201).json({
      username: newPost.username,
      mainBody: newPost.mainBody,
      poster: newPost.poster,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occurred while making post' });
  }
};

// get all posts via PostModel
const getPosts = (req, res) => PostModel.findAll((err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occured when getting posts' });
  }

  return res.json({ posts: docs });
});

// get all posts by certain user (using username) via PostModel 
const getUserPosts = (req, res) => {
 PostModel.findByPoster(req.session.account.username, (err, docs) => {
   if (err) {
     console.log(err);
     return res.status(400).json({ error: 'An error occured when getting posts' });
   }
 return res.json({ posts: docs });
})};

module.exports = {
  mainPage,
  makePost,
  getPosts,
  getUserPosts,
};
