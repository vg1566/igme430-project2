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
  const username = `${req.body.username.toUpperCase()}`;
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
    return res.status(200).json({ redirect: '/main' });
  });
};

// render profile page with token
const profilePage = (req, res) => {
  res.render('profile', { csrfToken: req.csrfToken() });
};

// render 404 page with token
const errorPage = (req, res) => {
  res.render('404', { csrfToken: req.csrfToken() });
};

// handle signup and send to main content
const signup = async (req, res) => {
  const username = `${req.body.username.toUpperCase()}`;
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
    return res.status(200).json({ redirect: '/main' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username already in use.' });
    }
    return res.status(400).json({ error: 'An error occured' });
  }
};

const setPremium = (req, res) => {
  // id separated due to max line length
  const id = req.session.account._id;
  return Account.updatePremium(id, req.body.premium, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Something went wrong...' });
    }

    // set session account
    req.session.account.premium = req.body.premium;
    return res.status(200).json({ message: 'Premium status successfully updated' });
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

const changeUsername = async (req, res) => {
  const oldUser = `${req.body.oldUser.toUpperCase()}`;
  const pass = `${req.body.pass}`;
  const newUser = `${req.body.newUser.toUpperCase()}`;

  // check for bad data
  if (!oldUser || !pass || !newUser) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (oldUser !== req.session.account.username) {
    return res.status(400).json({ error: 'Current username entered incorrectly!' });
  }

  // authenticate user
  return Account.authenticate(oldUser, pass, async (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong password!' });
    }
    try {
      return Account.changeUsername(oldUser, newUser, (err2, account2) => {
        if (err2 || !account2) {
          if (err2.code === 11000) {
            return res.status(400).json({ error: 'Username already in use.' });
          }
          return res.status(401).json({ error: 'Something went wrong when authorizing' });
        }
        req.session.account.username = newUser;
        return res.status(200).json({ message: 'Username changed successfully' });
      });
    } catch (err3) {
      return res.status(400).json({ error: 'An error occurred' });
    }
  });
};

// return token
const getToken = (req, res) => res.status(200).json({ csrfToken: req.csrfToken() });

// return user info
const getUserInfo = (req, res) => res.status(200).json({
  username: req.session.account.username,
  _id: req.session.account._id,
});

// return premium
const getPremium = (req, res) => Account.premium(req.session.account._id, (err, premium) => {
  if (err) {
    return res.status(401).json({ error: 'Something went wrong when authorizing' });
  }

  // set session account
  req.session.account.premium = premium;
  return res.status(200).json({ premium });
});

module.exports = {
  loginPage,
  login,
  profilePage,
  errorPage,
  logout,
  signup,
  setPremium,
  changePassword,
  changeUsername,
  getToken,
  getPremium,
  getUserInfo,
};
