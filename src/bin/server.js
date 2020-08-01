const app = require('../app');
const config = require('../config');
const logger = require('../loaders/logger');

const server = app.bind(this, config);

process.on('uncaughtException', (err) => {
  logger.error({ err }, `Uncaught error ...\n${err}`);
  process.exit(1);
});

module.exports = server;
