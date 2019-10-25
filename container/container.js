const awilix = require('awilix')
const makeUserService = require('../services/usersService')
const userModel = require('../models/userModel')

// Create the container and set the injectionMode to PROXY (which is also the default).
const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
})

container.register({
    // the `userService` is resolved by
    // invoking the function.
    userService: awilix.asFunction(makeUserService)
})

container.register({
    userModel: awilix.asValue(userModel)
})

module.exports = container;