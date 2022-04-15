// check session stuff and reroute accordingly. Also do secure checks

// if there's no account in session, redirect to login ('/')
const requiresLogin = (req, res, next) => {
  if (!req.session.account) {
    return res.redirect('/');
  }
  return next();
};

// if there's an account in session, redirect to main page ('/')
const requiresLogout = (req, res, next) => {
  if (req.session.account) {
    return res.redirect('/main');
  }
  return next();
};

// if not https, redirect to https
const requiresSecure = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.hostname}${req.url}`);
  }
  return next();
};

// keep moving
const bypassSecure = (req, res, next) => {
  next();
};

module.exports.requiresLogin = requiresLogin;
module.exports.requiresLogout = requiresLogout;

// if not in production, bypass secure check
if (process.env.NODE_ENV === 'production') {
  module.exports.requiresSecure = requiresSecure;
} else {
  module.exports.requiresSecure = bypassSecure;
}
// currently complete
