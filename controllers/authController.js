let bcrypt = require('bcrypt');
let Auth = require('../services/authService');
const container = require('../container/container')
const Users = container.resolve('userService');

exports.signUp = (req, res, next) => {
  if (Auth.validateUser(req.body)) {
    Users.getUserByEmail(req.body.email).then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10).then((hash) => {
          const user = { ...req.body };
          user.password = hash;
          const id = Users.create(user);
          // if register             setUserIdCookie(req, res, user.id);
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
            if (bcryptResult) {
                req.session.userId = user.id;
              res.json({ userId: user.id, message: 'log in' });
            } else {
              res.json(new Error('failed log in ' ));
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

exports.signOut = function(req, res) {
    req.session.destroy(function(){
        res.clearCookie('connect.sid');
        res.json({
            message: 'logged out'
        })
    });
}

