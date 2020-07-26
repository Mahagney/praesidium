// #region 'NPM DEP'
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// #endregion

// #region 'LOCAL DEP'
const { accessTokenSecret } = require('../../../config');
const userService = require('../../services/userService');
const emailService = require('../../services/emailService');
const fileService = require('../../services/fileService');
const { role } = require('../../utils/constants');
// #endregion

// #region 'INTERFACE'
const register = async (req, res, next) => {
  const { file } = req.file;
  if (!file) {
    return res.status(422).json('Attached file is not CSV type!');
  }

  return fileService
    .readFilePromise(file.path)
    .then((jsonUsers) => {
      return Promise.all(
        jsonUsers.map((jsonUser) => {
          // eslint-disable-next-line no-console
          console.log(jsonUser);
          return userService.createUser(jsonUser);
        }),
      );
    })
    .then((createdUsers) => {
      // eslint-disable-next-line no-console
      console.log(createdUsers);
      return Promise.all(
        createdUsers.map((createUser) => {
          return emailService.sendEmail(createUser);
        }),
      );
    })
    .then((emails) => {
      // eslint-disable-next-line no-console
      console.log(emails);
      return res.status(201).json('Users created.');
    })
    .catch((error) => {
      const err = new Error(error);
      err.statusCode = 500;
      err.customMessage = 'Register has failed!';
      next(err);
    });
};

const createUser = async (req, res, next) => {
  return userService
    .createUser(req.body, emailService.sendEmail)
    .then((createdUser) => {
      res.status(201).json(createdUser);
    })
    .catch((error) => {
      const err = new Error(error);
      err.statusCode = 500;
      err.customMessage = 'Register has failed!';
      next(err);
    });
};

const logIn = async (req, res, next) => {
  const { email, password } = req.body;
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
      }
      if (user.PASSWORD === password) {
        return true;
      }

      return false;
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
          one_time_auth: loadedUser.ONE_TIME_AUTH,
          role: loadedUser.IS_ADMIN ? role.ADMIN : role.USER,
        },
        accessTokenSecret,
        { expiresIn: '1h' },
      );

      res.status(200).json({
        token,
      });
    })
    .catch((error) => {
      const err = error;

      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const logOut = (_req, res, _next) => {
  res.status(200).json('Logged out.');
};

const updatePassword = (req, res, next) => {
  const { email, currentPassword, newPassword } = req.body;

  userService
    .getUserByEmail(email)
    .then((user) => {
      if (!user) {
        const err = new Error();
        err.statusCode = 401;
        err.customMessage = 'Credentiale gresite!';
        throw err;
      }
      return currentPassword === user.PASSWORD;
    })
    .then((isValid) => {
      if (isValid) {
        return bcrypt.hash(newPassword, 12);
      }

      const err = new Error();
      err.statusCode = 401;
      err.customMessage = 'Credentiale gresite!';
      throw err;
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
// #endregion

module.exports = { register, logIn, logOut, updatePassword, createUser };
