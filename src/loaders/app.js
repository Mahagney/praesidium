const cors = require('cors');
const morgan = require('morgan');
const { json, urlencoded } = require('express');

const { routes } = require('../api');
const multerLoader = require('./multer');
const { handleErrorMiddleware } = require('../api/middlewares');

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
  app.use(handleErrorMiddleware);
};

module.exports = appLoader;
