
exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTable("users", function (table) {
            table.increments(); // integer id
            // The name will be the same as the ID
            table.string("first_name").notNullable();
            table.string("last_name").notNullable();
            table.string("email").notNullable();
            table.string("password").notNullable();
        })])
};

exports.down = function(knex) {
    return knex.schema.dropTable("users");
};
