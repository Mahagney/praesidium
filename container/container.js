const awilix = require('awilix')
const { scopePerRequest } = require('awilix-express');
const makeUserService = require('../services/usersService')
const authService = require('../services/authService')
const userModel = require('../models/userModel')
const {makeSignIn} = require('../controllers/authController');

// Create the container and set the injectionMode to PROXY (which is also the default).
const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

container.register({
    // the `userService` is resolved by
    // invoking the function.
    userService: awilix.asFunction(makeUserService),
    authService: awilix.asValue(authService)
});

container.register({
    userModel: awilix.asValue(userModel),
});

container.register({
    containerMiddleware: awilix.asValue(scopePerRequest(container))
});

module.exports = container;