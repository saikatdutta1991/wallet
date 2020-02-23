const guid = require('objection-guid')({
	field: 'transaction_id'
});
const Base = require('./base');

class Transaction extends guid(Base) {

	static get tableName() {
		return 'transactions';
	}

	static async isReferenceExist(reference_id) {
		return !!await this.query().select('id').findOne({
			reference_id
		});
	}


	static async getByTxnId(transaction_id) {
		return await this.query().findOne({
			transaction_id
		});
	}


}

module.exports = Transaction;