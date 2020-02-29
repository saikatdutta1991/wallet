const guid = require("objection-guid")({
  field: "guid"
});
const _ = require("lodash");
const Base = require("./base");

class Wallet extends guid(Base) {
  static get tableName() {
    return "wallets";
  }

  static async getByGuid(guid) {
    return await Wallet.query().findOne({
      guid
    });
  }

  get $secureFields() {
    return ["id"];
  }

  $formatJson(json, options) {
    json = super.$formatJson(json, options);
    return _.omit(json, this.$secureFields);
  }

  static relationMappings = {
    transactions: {
      relation: Base.HasManyRelation,
      modelClass: `${__dirname}/transaction`,
      join: {
        from: "wallets.id",
        to: "transactions.wallet_id"
      }
    }
  };
}

module.exports = Wallet;
