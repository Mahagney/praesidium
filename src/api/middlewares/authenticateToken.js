// #region 'NPM DEP'
const jwt = require('jsonwebtoken');
const { get } = require('lodash');
// #endregion

const { accessTokenSecret } = require('../../config');

module.exports = (req, _res, next) => {
  const authHeader = get(req.headers, 'authorization', '');
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    const error = new Error('Not-authorized!');
    error.statusCode = 403;
    throw error;
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, accessTokenSecret);
  } catch (error) {
    error.statusCode = 403;
    throw error;
  }
  if (!decodedToken) {
    const error = new Error('Not-authorized!');
    error.statusCode = 403;
    throw error;
  }

  req.userId = decodedToken.id;
  req.role = decodedToken.role;

  next();
};
