//#region 'REQUIRE'
const awilix = require('awilix');
const knex = require('../knex/knex');
const { scopePerRequest } = require('awilix-express');
const makeUserService = require('../services/usersService');
const makeAuthService = require('../services/authService');
const makeEmailService = require('../services/emailService');
const makeUserModel = require('../models/userModel');
//#endregion

// Create the container and set the injectionMode to PROXY (which is also the default).
const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
});

//#region 'REGISTRATIONS
container.register({
  ormInstance: awilix.asValue(knex)
});

container.register({
  // the `userService` is resolved by
  // invoking the function.
  userService: awilix.asFunction(makeUserService),
  authService: awilix.asFunction(makeAuthService),
  emailService: awilix.asFunction(makeEmailService)
});

container.register({
  userModel: awilix.asFunction(makeUserModel)
});

container.register({
  containerMiddleware: awilix.asValue(scopePerRequest(container))
});
//#endregion
module.exports = container;
