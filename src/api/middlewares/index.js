const handleErrorMiddleware = require('./error');
const { loginMiddleware } = require('./auth');

module.exports = {
  auth: {
    loginMiddleware,
  },
  handleErrorMiddleware,
};
