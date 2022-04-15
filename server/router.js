// handles routing
// To-do: add account page
// requires: controllers, middleware
// exports: router

const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getPosts', mid.requiresLogin, controllers.Post.getPosts);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/main', mid.requiresLogin, controllers.Post.mainPage);
  app.post('/makePost', mid.requiresLogin, controllers.Post.makePost);

  app.get('/getPremium', mid.requiresLogin, controllers.Account.getPremium);
  app.post('/setPremium', mid.requiresLogin, controllers.Account.setPremium);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
