const express = require('express');

const logger = require('./loaders/logger');
const appLoader = require('./loaders/app');

function startServer(config) {
  const app = express();

  appLoader(app, config);

  const server = app.listen(config.port, (err) => {
    if (err) {
      logger.error({ err }, `Error caught on server listen ...`);
      process.exit(1);
    }
  });

  server.on('error', function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string' ? `Pipe ${config.port}` : `Port ${config.port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        logger.error({ bind }, `${bind} requires elevated privileges`);
        return process.exit(1);
      case 'EADDRINUSE':
        logger.error({ bind }, `${bind} is already in use`);
        return process.exit(1);
      default:
        throw error;
    }
  });

  server.on('listening', function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;

    logger.debug({ config }, `Server config`);
    logger.info({ addr }, `Listening on ${bind}`);
  });

  return server;
}

module.exports = startServer;
