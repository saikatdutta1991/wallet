/** 
 * This is base model that must be extened by all models
 */
const knex = require('../helpers/knex');
const {
    Model
} = require('objection');

Model.knex(knex); // pass the knex instance to Objection

class Base extends Model {

    $beforeUpdate() {
        this.updated_at = knex.fn.now();
    }

}

module.exports = Base;