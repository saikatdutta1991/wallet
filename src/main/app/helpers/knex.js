const dbConfig = require('../../config/database');
const Knex = require('knex');

module.exports = Knex(dbConfig);