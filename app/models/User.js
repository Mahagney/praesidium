const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'USER';
  }

  static get idColumn() {
    return 'ID';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['FIRST_NAME', 'LAST_NAME', 'CNP', 'EMAIL', 'PASSWORD'],

      properties: {
        FIRST_NAME: { type: 'string', minLength: 3, maxLength: 50 },
        LAST_NAME: { type: 'string', minLength: 3, maxLength: 50 },
        CNP: { type: 'string', minLength: 13, maxLength: 13 },
        EMAIL: { type: 'string', maxLength: 50 },
        PASSWORD: { type: 'string', minLength: 10, maxLength: 64 }
      }
    };
  }
}

module.exports = User;
