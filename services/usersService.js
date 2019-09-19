var User = require('../models/userModel');

exports.getUserByEmail = email => User.getUserByEmail(email);

exports.create = user => User.create(user);
