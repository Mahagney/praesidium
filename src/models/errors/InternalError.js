class InternalError extends Error {
  constructor(message, internalCode) {
    super(message);
    this.internalCode = internalCode;
    this.name = 'InternalError';
  }
}

module.exports = InternalError;
