let bcrypt = require('bcrypt');
let Auth = require('../services/authService');
let Users = require('../services/usersService');

exports.signUp = (req, res, next) => {
  if (Auth.validateUser(req.body)) {
    Users.getUserByEmail(req.body.email).then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10).then((hash) => {
          const user = { ...req.body };
          user.password = hash;
          const id = Users.create(user);
          res.json({ hash, message: 'signed up' });
        });
      } else {
        next(new Error('Email in use'));
      }
    });
  } else {
    next(new Error('Invalid user'));
  }
};

exports.signIn = function(req, res, next) {
  if (Auth.validateUser(req.body)) {
    Users.getUserByEmail(req.body.email).then((user) => {
      if (user) {
        bcrypt
          .compare(req.body.password, user.password)
          .then((bcryptResult) => {
            const isSecure = req.app.get('env') != 'development';
            res.cookie('user_id', user.id, {
              httpOnly: false,
              secure: isSecure,
              signed: true,
            });
            if (bcryptResult) {
              res.json({ userId: user.id, message: 'log in' });
            } else {
              res.json({ message: 'failed log in ' });
            }
          });
      } else {
        next(new Error('Invalid Login'));
      }
    });
  } else {
    next(new Error('Invalid Login'));
  }
};
