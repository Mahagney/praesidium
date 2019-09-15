var knex = require('../knex/knex');

module.exports = {
    getUserByEmail: (email) => knex('users').where('email', email).first(),

    create: (user) => knex('users').insert(user, 'id').then(ids => {
        return ids[0];
    })
}