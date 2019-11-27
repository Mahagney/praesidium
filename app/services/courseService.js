//#region 'LOCAL DEP'
const userModel = require('../models/User');
//#endregion

//TEMPORARY LOGIC
const getUsers = () => {
  return userModel.query().catch((error) => {
    let err = new Error(error);
    err.statusCode = 500;
    err.customMessage = 'Getting user by email -> COURSE SERVICE ERROR';
    throw err;
  });
};

module.exports = { getUsers };
