// controls actual server communication a la creating/saving new accounts and authenticating old ones and such
// requires: models
// exports: loginPage, login, logout, signup, setPremium, getToken, getPremium,

// render login with token
const loginPage = (req, res) => {
  // res.render('login', { csrfToken: req.csrfToken() });
};

// destroy session and take back to main page ('/')
const logout = (req, res) => {
  // req.session.destroy();
  // res.redirect('/');
};

// authenticate user, set session account, and send to main content
const login = (req, res) => {
  // check for bad data
  // authenticate user
  // set session account
  // redirect to main page
};

const signup = async (req, res) => {
  // check for bad data
  // try to save new account
  // set session account
  // redirect to main page
};

const setPremium = async (req, res) => {
  // Account.setPremium
  // set session premium
};

// return token
const getToken = (req, res) => res.json({ csrfToken: req.csrfToken() });

// return premium
const getPremium = (req, res) => {
  // return Account.premium
};
