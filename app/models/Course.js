const { Model } = require('objection');

class Course extends Model {
  static get tableName() {
    return 'COURSE';
  }

  static get idColumn() {
    return 'ID';
  }
}

module.exports = Course;
