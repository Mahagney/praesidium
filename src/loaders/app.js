const cors = require('cors');
const morgan = require('morgan');
const { json, urlencoded } = require('express');

const multerLoader = require('./multer');
const { routes } = require('../api');

const appLoader = (app, config) => {
  app.use(cors(config.cors));
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(morgan('tiny'));
  app.use(
    multerLoader([
      { name: 'video', maxCount: 1 },
      { name: 'pdf', maxCount: 1 },
    ]),
  );

  app.use(routes());

  // * Error-handling middlewares are placed last.
  app.use((error, _req, res, _next) => {
    const status = error.statusCode || 500;
    let customMessage = null;
    if (status === 500) {
      customMessage = 'Eroare server!';
    } else {
      customMessage = error.customMessage || error.message;
    }
    res.status(status).json({ customMessage });
  });
};

module.exports = appLoader;
