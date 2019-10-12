
exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTable('USERS', function (table) {
            // creates ID bigInteger and autoincrement and PK
            table.bigIncrements("ID");
            table.string('FIRST_NAME', 50).notNullable();
            table.string('LAST_NAME', 50).notNullable();
            table.string('CNP', 13).notNullable();
            table.string('EMAIL', 50).notNullable();
            table.string('PASSWORD', 50).notNullable();
        })
        .createTable('EMPLOYEE_TYPES', function (table) {
            table.bigIncrements("ID");
            table.string('NAME', 50).notNullable();
        })
        .createTable('USERS_EMPLOYEE_TYPES', function (table) {
            table.bigIncrements("ID");
            table.bigInteger('ID_USERS').notNullable().unsigned().index().references('ID').inTable('USERS');
            table.bigInteger('ID_EMPLOYEE_TYPES').notNullable().unsigned().index().references('ID').inTable('EMPLOYEE_TYPES');
        })
        .createTable('COURSES_TYPES', function(table){
            table.bigIncrements("ID");
            table.string('NAME', 25).notNullable();
            table.integer('MONTHS_NUMBER').notNullable();
        })
        .createTable('COURSES', function (table) {
            table.bigIncrements("ID");
            table.string('NAME', 250).notNullable();
            table.string('PDF_URL', 500).notNullable();
            table.string('VIDEO_URL', 500).notNullable();
            table.bigInteger('ID_COURSES_TYPES').notNullable().unsigned().index().references('ID').inTable('COURSES_TYPES');
        })
        .createTable('QUESTIONS', function(table){
            table.bigIncrements("ID");
            table.string('TEXT', 500);
        })
        .createTable('COURSES_QUESTIONS', function(table){
            table.bigIncrements("ID");
            table.bigInteger('ID_COURSES').notNullable().unsigned().index().references('ID').inTable('COURSES');
            table.bigInteger('ID_QUESTIONS').notNullable().unsigned().index().references('ID').inTable('QUESTIONS');
        })
        .createTable('ANSWERS', function(table){
            table.bigIncrements("ID");
            table.string('TEXT', 250).notNullable();
            table.boolean('IS_CORRECT').notNullable();
            table.bigInteger('ID_QUESTIONS').notNullable().unsigned().index().references('ID').inTable('QUESTIONS');
        })
        .createTable('EMPLOYEE_TYPES_COURSES', function(table){
            table.bigIncrements("ID");
            table.bigInteger('ID_EMPLOYEE_TYPES').notNullable().unsigned().index().references('ID').inTable('EMPLOYEE_TYPES');
            table.bigInteger('ID_COURSES').notNullable().unsigned().index().references('ID').inTable('COURSES');
        })
        .createTable('USER_CONFIRMATIONS', function(table){
            table.bigIncrements("ID");
            table.bigInteger('ID_USERS').notNullable().unsigned().index().references('ID').inTable('USERS');
            table.bigInteger('ID_COURSES').notNullable().unsigned().index().references('ID').inTable('COURSES');
            table.datetime('VIDEO_CONFIRMATION_DATE');
            table.datetime('PDF_CONFIRMATION_DATE');
            table.datetime('QUIZ_CONFIRMATION_DATE');
            table.datetime('QUIZ_CONFIRMATION_END_DATE');
            table.decimal('QUIZ_PERCENTAGE', 3, 2);
        })
        .createTable('QUIZ_VALUES', function(table){
            table.bigIncrements("ID");
            table.bigInteger('ID_USER_CONFIRMATIONS').notNullable().unsigned().index().references('ID').inTable('USER_CONFIRMATIONS');
            table.bigInteger('ID_QUESTIONS').notNullable().unsigned().index().references('ID').inTable('QUESTIONS');
            table.bigInteger('ID_ANSWERS').notNullable().unsigned().index().references('ID').inTable('ANSWERS');
        })
    ]);
};

exports.down = function(knex) {
    return Promise.all([
        knex.schema.dropTable("EMPLOYEE_TYPES_COURSES")
        .dropTable("QUIZ_VALUES")
        .dropTable("COURSES_QUESTIONS")
        .dropTable("USER_CONFIRMATIONS")
        .dropTable("ANSWERS")
        .dropTable("QUESTIONS")
        .dropTable("COURSES")
        .dropTable("COURSES_TYPES")
        .dropTable("USERS_EMPLOYEE_TYPES")
        .dropTable("EMPLOYEE_TYPES")
        .dropTable("USERS")
    ]);
};
