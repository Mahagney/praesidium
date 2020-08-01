const { createLogger } = require('bunyan');

const { packageName, packageVersion, logger: loggerConfig } = require('../config');

const logger = createLogger({
  name: `${packageName}@${packageVersion}`,
  streams: [
    {
      level: loggerConfig.streams.stdout.level,
      stream: process.stdout,
    },
  ],
});

module.exports = logger;
