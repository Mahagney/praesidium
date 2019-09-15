var user = require('../models/userModel');

exports.getUserByEmail = email => user.getUserByEmail(email);
