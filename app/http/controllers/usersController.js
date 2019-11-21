const container = require('../../../container/container');
const user = container.resolve('userService');

// Display list of all Authors.
exports.getUserByEmail = (req, res) =>
  user.getUserByEmail(req.query.email).then((u) => {
    res.json(u);
  });
