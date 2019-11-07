const bcrypt = require('bcrypt');

const makeAuthController = ({ userService, authService }) => {
  return {
    signUp: (req, res, next) => {
      if (authService.validateUser(req.body)) {
        userService.getUserByEmail(req.body.email).then((user) => {
          if (!user) {
            bcrypt.hash(req.body.password, 10).then((hash) => {
              const user = { ...req.body };
              user.password = hash;
              const id = userService.create(user);
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
    },

    signIn: (req, res, next) => {
      if (authService.validateUser(req.body)) {
        userService.getUserByEmail(req.body.email).then((user) => {
          if (user) {
            bcrypt
              .compare(req.body.password, user.password)
              .then((bcryptResult) => {
                if (bcryptResult) {
                  req.session.userId = user.id;
                  res.json({ userId: user.id, message: 'log in' });
                } else {
                  res.status(401);
                  next(new Error('Failed log in '));
                }
              });
          } else {
            res.status(401);
            next(new Error('Invalid Login'));
          }
        });
      } else {
        next(new Error('Invalid Login'));
      }
    },

    signOut: (req, res) => {
      req.session.destroy(function() {
        res.clearCookie('connect.sid');
        res.json({
          message: 'logged out',
        });
      });
    },
  };
};

module.exports = makeAuthController;
