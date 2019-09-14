var knex = require('../knex/knex');

module.exports = {
    getUserByEmail: () => knex('users').where('id', 1).first()
}