const InternalError = require('../InternalError');

class BadUserPasswordError extends InternalError {
  constructor(message, internalCode) {
    super(message, internalCode);
    this.name = 'BadUserPasswordError';
  }
}

module.exports = BadUserPasswordError;
