//#region 'NPM DEP'
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

//#endregion

//#region 'LOCAL DEP'
const userService = require('../../services/userService');
const emailService = require('../../services/emailService');
const fileService = require('../../services/fileService');
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
          console.log(jsonUser);
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
      res.status(201).json('Users created.');
    })
    .catch((error) => {
      let err = new Error(error);
      err.statusCode = 500;
      err.customMessage = 'Register has failed!';
      next(err);
    });
};

const logIn = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    const err = new Error('Authentication failed!');
    err.statusCode = 401;
    throw err;
  }
  let loadedUser;
  userService
    .getUserByEmail(email)
    .then((user) => {
      if (!user) {
        const err = new Error('Authentication failed!');
        err.statusCode = 401;
        throw err;
      }
      loadedUser = user;
      if (user.ONE_TIME_AUTH) {
        return bcrypt.compare(password, user.PASSWORD);
      } else if (user.PASSWORD === password) {
        return true;
      }
    })
    .then((isAuth) => {
      if (!isAuth) {
        const err = new Error('Authentication failed!');
        err.statusCode = 401;
        throw err;
      }

      const token = jwt.sign(
        {
          id: loadedUser.ID,
          email: loadedUser.EMAIL,
          one_time_auth: loadedUser.ONE_TIME_AUTH
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).json({
        token: token
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

const logOut = (req, res, next) => {
  res.status(200).json('Logged out.');
};

const updatePassword = (req, res, next) => {
  const email = req.body.email;
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;

  userService
    .getUserByEmail(email)
    .then((user) => {
      if (!user) {
        const err = new Error();
        err.statusCode = 401;
        err.customMessage = 'Credentiale gresite!';
        throw err;
      }
      return currentPassword === user.PASSWORD ? true : false;
    })
    .then((isValid) => {
      if (isValid) {
        return bcrypt.hash(newPassword, 12);
      }
      else
      {
        const err = new Error();
        err.statusCode = 401;
        err.customMessage = 'Credentiale gresite!';
        throw err;
      }
    })
    .then((hashedPassword) => {
      return userService.updateUserPassword(email, hashedPassword);
    })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      next(error);
    });
};

//#endregion

module.exports = { register, logIn, logOut, updatePassword };
