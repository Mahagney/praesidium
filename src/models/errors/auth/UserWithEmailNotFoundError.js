const InternalError = require('../InternalError');

class UserWithEmailNotFoundError extends InternalError {
  constructor(message, internalCode) {
    super(message, internalCode);
    this.name = 'UserWithEmailNotFoundError';
  }
}

module.exports = UserWithEmailNotFoundError;
