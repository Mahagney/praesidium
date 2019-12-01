//#region 'NPM DEP'
const jwt = require('jsonwebtoken');
//#endregion

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    const error = new Error('Not-authorized!');
    error.statusCode = 403;
    throw error;
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
  if (!decodedToken) {
    const error = new Error('Not-authorized!');
    error.statusCode = 403;
    throw error;
  }

  req.userId = decodedToken.id;
  next();
};
