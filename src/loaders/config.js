const { config } = require('dotenv');

const configLoader = () => {
  const env = config();

  if (env.error) {
    throw new Error('.env file could not be loaded');
  }
};

module.exports = configLoader;
