//#region 'NPM DEP'
const passGenerator = require('generate-password');
//#endregion

//#region 'LOCAL DEP'
const userModel = require('../models/User');
//#endregion

const getUserByEmail = (email) => {
  return userModel
    .query()
    .where('EMAIL', email)
    .first()
    .catch((error) => {
      let err = new Error(error);
      err.statusCode = 500;
      err.customMessage = 'Getting user by email -> USER SERVICE ERROR';
      throw err;
    });
};

const createUser = (jsonUser) => {
  const userPassword = passGenerator.generate({
    length: 10,
    numbers: true
  });

  user = JSON.parse(jsonUser);
  user.PASSWORD = userPassword;

  return userModel
    .query()
    .insert(user)
    .catch((error) => {
      let err = new Error(error);
      err.statusCode = 500;
      err.customMessage = 'Creating user -> USER SERVICE ERROR';
      throw err;
    });
};

module.exports = { getUserByEmail, createUser };
