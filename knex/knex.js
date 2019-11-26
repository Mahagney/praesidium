const config = require('../knexfile.js')['development'];
const knex = require('knex');
const { Model } = require('objection');

const knexInstance = knex(config);
Model.knex(knexInstance);

module.exports = knexInstance;
