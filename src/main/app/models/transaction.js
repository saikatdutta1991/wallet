const _ = require("lodash");
const Base = require("./base");
const { raw } = require("objection");
const guid = require("objection-guid")({
  field: "transaction_id"
});

class Transaction extends guid(Base) {
  static get tableName() {
    return "transactions";
  }

  static async isReferenceExist(reference_id) {
    return !!(await this.query()
      .select("id")
      .findOne({
        reference_id
      }));
  }

  static async isReferenceUnique(transactionId, reference) {
    const records = await this.query()
      .where("reference_id", reference)
      .whereNot("transaction_id", transactionId)
      .limit(1);
    return !_.head(records);
  }

  static async getByTxnId(transaction_id) {
    return await this.query().findOne({
      transaction_id
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
    wallet: {
      relation: Base.BelongsToOneRelation,
      modelClass: `${__dirname}/wallet`,
      join: {
        from: "transactions.wallet_id",
        to: "wallets.id"
      }
    }
  };
}

module.exports = Transaction;
