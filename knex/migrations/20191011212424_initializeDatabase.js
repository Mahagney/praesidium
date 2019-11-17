exports.up = function(knex) {
  return Promise.all([
    knex.schema
      .createTable('USER', function(table) {
        // creates ID bigInteger and autoincrement and PK
        table.bigIncrements('ID');
        table.string('FIRST_NAME', 50).notNullable();
        table.string('LAST_NAME', 50).notNullable();
        table.string('CNP', 13).notNullable();
        table.string('EMAIL', 50).notNullable();
        table.string('PASSWORD', 60).notNullable();
      })
      .createTable('EMPLOYEE_TYPE', function(table) {
        table.bigIncrements('ID');
        table.string('NAME', 50).notNullable();
      })
      .createTable('USER_EMPLOYEE_TYPE', function(table) {
        table.bigIncrements('ID');
        table
          .bigInteger('ID_USER')
          .notNullable()
          .unsigned()
          .index()
          .references('ID')
          .inTable('USER');
        table
          .bigInteger('ID_EMPLOYEE_TYPE')
          .notNullable()
          .unsigned()
          .index()
          .references('ID')
          .inTable('EMPLOYEE_TYPE');
      })
      .createTable('COURSE_TYPE', function(table) {
        table.bigIncrements('ID');
        table.string('NAME', 25).notNullable();
        table.integer('MONTHS_NUMBER').notNullable();
      })
      .createTable('COURSE', function(table) {
        table.bigIncrements('ID');
        table.string('NAME', 250).notNullable();
        table.string('PDF_URL', 500).notNullable();
        table.string('VIDEO_URL', 500).notNullable();
        table
          .bigInteger('ID_COURSE_TYPE')
          .notNullable()
          .unsigned()
          .index()
          .references('ID')
          .inTable('COURSE_TYPE');
      })
      .createTable('QUESTION', function(table) {
        table.bigIncrements('ID');
        table.string('TEXT', 500);
      })
      .createTable('COURSE_QUESTION', function(table) {
        table.bigIncrements('ID');
        table
          .bigInteger('ID_COURSE')
          .notNullable()
          .unsigned()
          .index()
          .references('ID')
          .inTable('COURSE');
        table
          .bigInteger('ID_QUESTION')
          .notNullable()
          .unsigned()
          .index()
          .references('ID')
          .inTable('QUESTION');
      })
      .createTable('ANSWER', function(table) {
        table.bigIncrements('ID');
        table.string('TEXT', 250).notNullable();
        table.boolean('IS_CORRECT').notNullable();
        table
          .bigInteger('ID_QUESTION')
          .notNullable()
          .unsigned()
          .index()
          .references('ID')
          .inTable('QUESTION');
      })
      .createTable('EMPLOYEE_TYPE_COURSE', function(table) {
        table.bigIncrements('ID');
        table
          .bigInteger('ID_EMPLOYEE_TYPE')
          .notNullable()
          .unsigned()
          .index()
          .references('ID')
          .inTable('EMPLOYEE_TYPE');
        table
          .bigInteger('ID_COURSE')
          .notNullable()
          .unsigned()
          .index()
          .references('ID')
          .inTable('COURSE');
      })
      .createTable('USER_CONFIRMATION', function(table) {
        table.bigIncrements('ID');
        table
          .bigInteger('ID_USER')
          .notNullable()
          .unsigned()
          .index()
          .references('ID')
          .inTable('USER');
        table
          .bigInteger('ID_COURSE')
          .notNullable()
          .unsigned()
          .index()
          .references('ID')
          .inTable('COURSE');
        table.datetime('VIDEO_CONFIRMATION_DATE');
        table.datetime('PDF_CONFIRMATION_DATE');
        table.datetime('QUIZ_CONFIRMATION_DATE');
        table.datetime('QUIZ_CONFIRMATION_END_DATE');
        table.decimal('QUIZ_PERCENTAGE', 3, 2);
      })
      .createTable('QUIZ_VALUE', function(table) {
        table.bigIncrements('ID');
        table
          .bigInteger('ID_USER_CONFIRMATION')
          .notNullable()
          .unsigned()
          .index()
          .references('ID')
          .inTable('USER_CONFIRMATION');
        table
          .bigInteger('ID_QUESTION')
          .notNullable()
          .unsigned()
          .index()
          .references('ID')
          .inTable('QUESTION');
        table
          .bigInteger('ID_ANSWER')
          .notNullable()
          .unsigned()
          .index()
          .references('ID')
          .inTable('ANSWER');
      }),
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema
      .dropTable('EMPLOYEE_TYPE_COURSE')
      .dropTable('QUIZ_VALUE')
      .dropTable('COURSE_QUESTION')
      .dropTable('USER_CONFIRMATION')
      .dropTable('ANSWER')
      .dropTable('QUESTION')
      .dropTable('COURSE')
      .dropTable('COURSE_TYPE')
      .dropTable('USER_EMPLOYEE_TYPE')
      .dropTable('EMPLOYEE_TYPE')
      .dropTable('USER'),
  ]);
};
