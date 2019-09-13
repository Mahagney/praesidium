var user = require('../services/usersServece');

// Display list of all Authors.
exports.getUserByEmail = function(req, res) {
    res.send('User ' + user.getUserByEmail("smahagney@gmail.com"));
};