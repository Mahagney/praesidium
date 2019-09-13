var user = require('../models/userModel');

// Display list of all Authors.
exports.getUserByEmail = function(email) {
    user.getUserByEmail(email);
};