// The schema for account creation (blueprints here)

// bcrypt for password encryption, mongoose for interacting with mongo
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const saltRounds = 10;

let AccountModel = {};

const AccountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^[A-Za-z0-9_\-.]{1,16}$/,
  },
  password: {
    type: String,
    required: true,
  },
  premium: {
    type: String,
    default: 'false',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

// converts a doc to something redis-storable
AccountSchema.statics.toAPI = (doc) => ({
  username: doc.username,
  premium: doc.premium,
  _id: doc._id,
});

// hash a password
AccountSchema.statics.generateHash = (password) => bcrypt.hash(password, saltRounds);

// check if info is correct (find password attached to username and compare passwords w/ bcrypt)
AccountSchema.statics.authenticate = async (username, password, callback) => {
  try {
    const doc = await AccountModel.findOne({ username }).exec();
    if (!doc) {
      return callback();
    }

    const match = await bcrypt.compare(password, doc.password);
    if (match) {
      return callback(null, doc);
    }
    return callback();
  } catch (err) {
    return callback(err);
  }
};

// updates this account's premium status (search by id)
AccountSchema.statics.updatePremium = async (_id, updatedPremium, callback) => {
  try {
    const filter = { _id };
    const update = { premium: updatedPremium };
    const doc = await AccountModel.updateOne(filter, update);
    if (!doc) {
      return callback();
    }
    return callback(null, doc);
  } catch (err) {
    return callback(err);
  }
};

// updates this account's password (search by username)
AccountSchema.statics.changePassword = async (username, password, callback) => {
  try {
    const filter = { username };
    const update = { password: password };
    const doc = await AccountModel.updateOne(filter, update);
    
    if (!doc) {
      return callback();
    }
    return callback(null, doc);
  } catch (err) {
    return callback(err);
  }
};

// retrieves whether or not this account has premium (search by id)
AccountSchema.statics.premium = async (_id, callback) => {
  try {
    const doc = await AccountModel.findOne({ _id }).exec();
    if (!doc) {
      return callback();
    }
    return callback(null, doc.premium);
  } catch (err) {
    return callback(err);
  }
};

AccountModel = mongoose.model('Account', AccountSchema);
module.exports = AccountModel;
// currently complete
