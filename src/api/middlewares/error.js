const { HttpResponseError } = require('../../models/errors');

const logger = require('../../loaders/logger');

const handleError = (err, _req, res, _next) => {
  if (err instanceof HttpResponseError) {
    res.status(err.statusCode);

    res.json({
      code: err.internalCode,
      message: err.externalMessage,
    });
  } else {
    logger.error({ err, message: err.message }, 'caught unknown error');

    res.status(500);

    res.json({
      code: 'uncaught-999',
      message: 'uncaught error',
    });
  }
};

module.exports = handleError;
