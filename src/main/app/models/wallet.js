const guid = require('objection-guid')({
	field: 'guid'
});
const Base = require('./base');

class Wallet extends guid(Base) {

	static get tableName() {
		return 'wallets';
	}

	static async getByGuid(guid) {
		return await Wallet.query().findOne({
			guid
		});
	}

}

module.exports = Wallet;