const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { isUndefined: _isUndefined, isNull: _isNull } = require('lodash');

const logger = require('../../loaders/logger');
const userService = require('../../services/userService');
const fileService = require('../../services/fileService');
const emailService = require('../../services/emailService');
const { UserWithEmailNotFoundError, BadUserPasswordError } = require('../../models/errors/auth');
const {
  accessTokenSecret,
  constants: { role },
} = require('../../config');

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
          logger.debug({ jsonUser });
          return userService.createUser(jsonUser);
        }),
      );
    })
    .then((createdUsers) => {
      logger.debug({ createdUsers });
      return Promise.all(
        createdUsers.map((createUser) => {
          return emailService.sendEmail(createUser);
        }),
      );
    })
    .then((emails) => {
      logger.debug({ emails });
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

const login = async (email, password) => {
  try {
    const user = await userService.getUserByEmail(email);

    if (_isUndefined(user) || _isNull(user)) {
      throw new UserWithEmailNotFoundError(`User with email ${email} not found`);
    }

    // TODO: encrypt first password and change check accordingly
    const passwordIsGood = user.ONE_TIME_AUTH
      ? await bcrypt.compare(password, user.PASSWORD)
      : user.PASSWORD === password;

    if (!passwordIsGood) {
      throw new BadUserPasswordError(`Bad password received for email ${email}`);
    }

    // TODO: this step must be moved to a middleware
    const token = jwt.sign(
      {
        id: user.ID,
        email: user.EMAIL,
        one_time_auth: user.ONE_TIME_AUTH,
        role: user.IS_ADMIN ? role.ADMIN : role.USER,
      },
      accessTokenSecret,
      { expiresIn: '1h' },
    );

    return token;
  } catch (err) {
    logger.error({ err, message: err.message }, 'Error caught in auth login controller');
    throw err;
  }
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

module.exports = { register, login, logOut, updatePassword, createUser };
