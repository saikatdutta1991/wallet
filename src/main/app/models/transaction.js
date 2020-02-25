const _ = require('lodash');
const Base = require('./base');
const {
	raw
} = require('objection');
const guid = require('objection-guid')({
	field: 'transaction_id'
});


class Transaction extends guid(Base) {

	static get tableName() {
		return 'transactions';
	}

	static async isReferenceExist(reference_id) {
		return !!await this.query().select('id').findOne({
			reference_id
		});
	}

	static async isReferenceUnique(transactionId, reference) {
		const records = await this.query().where('reference_id', reference).whereNot('transaction_id', transactionId).limit(1);
		return !_.head(records);
	}


	static async getByTxnId(transaction_id) {
		return await this.query().findOne({
			transaction_id
		});
	}

}

module.exports = Transaction;