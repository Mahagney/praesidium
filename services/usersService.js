var User = require('../models/userModel');

const makeUserService = ({ userModel }) => {
    return {
        getUserByEmail : (email) => userModel.getUserByEmail(email),
        create : (user) => userModel.create(user)
    }
}

module.exports = makeUserService;
