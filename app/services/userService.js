const userModel = require('../models/User');

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

const createUser = (user) => {
  return userModel
    .query()
    .insert(user)
    .returning('ID')
    .catch((error) => {
      let err = new Error(error);
      err.statusCode = 500;
      err.customMessage = 'Creating user -> USER SERVICE ERROR';
      throw err;
    });
};

module.exports = { getUserByEmail, createUser };
