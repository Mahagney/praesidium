var user = require('../services/usersServece');

// Display list of all Authors.
exports.getUserByEmail = (req, res) =>
    user.getUserByEmail("smahagney@gmail.com").then( u => res.json(u))
