// controls actual server communication
// a la creating/saving new accounts and authenticating old ones and such

// requires: models
// exports: loginPage, login, logout, signup, setPremium, getToken, getPremium,

const models = require('../models');

const { Account } = models;

// render login with token
const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

// destroy session and take back to main page ('/')
const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

// authenticate user, set session account, and send to main content
const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;

  // check for bad data
  if (!username || !pass) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  // authenticate user
  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password!' });
    }

    // set session account and redirect to main page
    req.session.account = Account.toAPI(account);
    return res.json({ redirect: '/main' });
  });
};

// render login with token
const profilePage = (req, res) => {
  res.render('profile', { csrfToken: req.csrfToken() });
};

const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  // check for bad data
  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match!' });
  }

  // try to save new account
  try {
    const hash = await Account.generateHash(pass);
    const newAccount = new Account({ username, password: hash });
    await newAccount.save();
    // set session account and redirect to main page
    req.session.account = Account.toAPI(newAccount);
    return res.json({ redirect: '/main' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username already in use.' });
    }
    return res.status(400).json({ error: 'An error occured' });
  }
};

const setPremium = (req, res) => {
  Account.updatePremium(req.session.account._id, req.body.premium, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Something went wrong...' });
    }

    // set session account
    req.session.account.premium = req.body.premium;
    return res.status(204).json({ premium: req.body.premium });
  });
};

const changePassword = async (req, res) => {
  const username = `${req.session.account.username}`;
  const oldPass = `${req.body.oldPass}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  // check for bad data
  if (!username || !oldPass || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match!' });
  }

  // authenticate user
  return Account.authenticate(username, oldPass, async (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong password!' });
    }
    try {
      const hash = await Account.generateHash(pass);

      return Account.changePassword(username, hash, (err2, account2) => {
        if (err2 || !account2) {
          return res.status(401).json({ error: 'Something went wrong when authorizing' });
        }
        return res.status(200).json({ message: 'Password changed successfully' });
      });
    } catch (err3) {
      return res.status(400).json({ error: 'An error occurred' });
    }
  });
};

const changeUsername = (req, res) => {
  Account.updatePremium(req.session.account._id, req.body.premium, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Something went wrong...' });
    }

    // set session username
    req.session.account.username = req.body.username;
    return res.status(204).json({ message: 'Username changed successfully' });
  });
};

// return token
const getToken = (req, res) => res.json({ csrfToken: req.csrfToken() });

const getUserInfo = (req, res) => res.json({ username: req.session.account.username });

// return premium
const getPremium = (req, res) => Account.premium(req.session.account._id, (err, premium) => {
  if (err) {
    return res.status(401).json({ error: 'Something went wrong when authorizing' });
  }

  // set session account and redirect to main page
  req.session.account.premium = premium;
  return res.status(200).json({ premium }); // what to put instead?
});

module.exports = {
  loginPage,
  login,
  profilePage,
  logout,
  signup,
  setPremium,
  changePassword,
  changeUsername,
  getToken,
  getPremium,
  getUserInfo,
};
// currently complete
