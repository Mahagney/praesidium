const bcrypt = require('bcrypt');

const makeAuthController = ({ userService, authService, emailService }) => {
  return {
    signUp: (req, res, next) => {
      if (authService.validateUser(req.body)) {
        userService.getUserByEmail(req.body.email).then((user) => {
          if (!user) {
            bcrypt.hash(req.body.password, 10).then((hash) => {
              const user = { ...req.body };
              user.password = hash;
              const userDbFormat = {
                FIRST_NAME: user.firstName,
                LAST_NAME: user.lastName,
                CNP: user.cnp,
                EMAIL: user.email,
                PASSWORD: user.password
              };
              const id = userService.create(userDbFormat);
              // if register             setUserIdCookie(req, res, user.id);
              emailService.sendEmail(user);
              res.json({ hash, message: 'Signed up' });
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
              .compare(req.body.password, user.PASSWORD)
              .then((bcryptResult) => {
                if (bcryptResult) {
                  req.session.userId = user.ID;
                  res.json({ userId: user.ID, message: 'Logged in' });
                } else {
                  res.status(401);
                  res.json(new Error('Invalid log in '));
                }
              });
          } else {
            res.status(401);
            next(new Error('Invalid Login'));
          }
        });
      } else {
        res.status(401);
        next(new Error('Invalid Login'));
      }
    },

    signOut: (req, res) => {
      req.session.destroy(function() {
        res.clearCookie('connect.sid');
        res.json({
          message: 'Logged out'
        });
      });
    }
  };
};

module.exports = makeAuthController;
