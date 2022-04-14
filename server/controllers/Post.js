const models = require('../models');

//const { Post } = models;

// render app page with token
const mainPage = (req, res) => {
  res.render('app', { csrfToken: req.csrfToken() });
};

const makePost = (req, res) => {
  //res.render('app', { csrfToken: req.csrfToken() });
};

module.exports = {
    mainPage,
    makePost,
  };