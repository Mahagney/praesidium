const { get: _get, isUndefined: _isUndefined } = require('lodash');

const { HttpErrorCodes } = require('../../models');
const { HttpResponseError } = require('../../models/errors');
const {
  auth: { loginController },
} = require('../controllers');
const { BadUserPasswordError, UserWithEmailNotFoundError } = require('../../models/errors/auth');

const loginMiddleware = async (req, res, next) => {
  try {
    const { email, password } = _get(req, 'body', {});

    if (_isUndefined(email)) {
      throw new HttpResponseError(
        'email param is undefined',
        HttpErrorCodes.BAD_REQUEST,
        'email body parameter is undefined',
        'auth-login-100',
      );
    }

    if (_isUndefined(password)) {
      throw new HttpResponseError(
        'password param is undefined',
        HttpErrorCodes.BAD_REQUEST,
        'password body parameter is undefined',
        'auth-login-101',
      );
    }

    try {
      const token = await loginController(email, password);

      // TODO: this step need to be moved in a middleware
      // TODO: don't send directly the http response
      res.status(200).json({
        token,
      });
    } catch (err) {
      if (err instanceof UserWithEmailNotFoundError || err instanceof BadUserPasswordError) {
        throw new HttpResponseError(
          'wrong credentials',
          HttpErrorCodes.UNAUTHORIZED,
          'wrong credentials',
          'auth-login-102',
        );
      }

      throw err;
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  loginMiddleware,
};
