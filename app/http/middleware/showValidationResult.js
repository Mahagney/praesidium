// #region 'NPM DEP'
const { validationResult } = require('express-validator');
// #endregion

const showValidationResult = (req, res, next) => {
  const errors = validationResult(req).array();
  if (errors.length) {
    return res.status(422).json({
      errorMessage: errors[0].msg,
    });
  }
  return next();
};

module.exports = showValidationResult;
