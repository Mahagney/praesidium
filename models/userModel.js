var knex = require('../models/userModel');

module.exports = {
    getUserByEmail: function (email) {
        console.log("id user = " + email);
        return knex('users').where('id', email).first();
    }
}