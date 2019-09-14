var user = require('../models/userModel');

// Display list of all Authors.
exports.getUserByEmail = email => user.getUserByEmail(email);
