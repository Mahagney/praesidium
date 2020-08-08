class HttpResponseError extends Error {
  constructor(message, statusCode, externalMessage, internalCode) {
    super(message);
    this.statusCode = statusCode;
    this.externalMessage = externalMessage;
    this.internalCode = internalCode;
    this.name = 'HttpResponseError';
  }
}

module.exports = HttpResponseError;
