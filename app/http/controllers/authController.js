//#region 'NPM DEP'
const bcrypt = require('bcrypt');
const saltRounds = 10;
//#endregion

//#region 'LOCAL DEP'
const authService = require('../../services/authService');
const userService = require('../../services/userService');
const emailService = require('../../services/emailService');
const fileService = require('../../services/fileService');
//#endregion

//#region 'PRIVATE'
const hashPasswordPromise = (jsonUser) => {
  const user = JSON.parse(jsonUser);
  return new Promise((resolve, reject) => {
    const userPassword = passGenerator.generate({
      length: 10,
      numbers: true
    });
    bcrypt
      .hash(userPassword, 10)
      .then((hash) => {
        user.PASSWORD = hash;
        resolve(user);
      })
      .catch((error) => reject(error));
  });
};
//#endregion

//#region 'INTERFACE'
const register = (req, res, next) => {
  const file = req.file;
  if (!file) {
    return res.status(422).json('Attached file is not CSV type!');
  }

  fileService
    .readFilePromise(file.path)
    .then((jsonUsers) => {
      return Promise.all(
        jsonUsers.map((jsonUser) => {
          return userService.createUser(jsonUser);
        })
      );
    })
    .then((createdUsers) => {
      console.log(createdUsers);
      return Promise.all(
        createdUsers.map((createUser) => {
          return emailService.sendEmail(createUser);
        })
      );
    })
    .then((emails) => {
      console.log(emails);
      return res.status(200).json('Users registered.');
    })
    .catch((error) => {
      console.log('MY PROMISE FLOW ERROR');
      console.log(error);
      return res.status(500).send('Register has failed!');
    });
};

const logIn = (req, res, next) => {
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
};

const logOut = (req, res, next) => {
  req.session.destroy(function() {
    res.clearCookie('connect.sid');
    res.json({
      message: 'Logged out'
    });
  });
};

//#endregion

module.exports = { register, logIn, logOut };
