var user = require('../services/usersService');

// Display list of all Authors.
exports.getUserByEmail = (req, res) =>
  user.getUserByEmail(req.body.email).then((u) => res.json(u));
