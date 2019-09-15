var knex = require('../knex/knex');

module.exports = {
    getUserByEmail: (email) => knex('users').where('email', email).first()
}