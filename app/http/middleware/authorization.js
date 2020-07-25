module.exports = (requiredRole) => {
  return (req, res, next) => {
    if (req.role === requiredRole) {
      return next();
    }

    return res.status(403).send('Unauthorized');
  };
};
