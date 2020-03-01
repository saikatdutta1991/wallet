const cron = require("node-cron");
const _ = require("lodash");
const Logger = require("../helpers/logger");
const Transaction = require("../models/transaction");
const TransctionHelper = require("../helpers/transaction");
const { constants } = require("../../config/api");
const Moment = require("moment");

cron.schedule("*/30 * * * * *", () => {
  Transaction.query()
    .where("status", constants.ON_HOLD)
    .where(function() {
      this.where(
        "expires_at",
        "<",
        Moment.utc().format("YYYY-MM-DD HH:mm:ss")
      ).orWhere("expires_at", null);
    })
    .withGraphFetched("wallet")
    .chunk(10, async transactions => {
      _.each(transactions, async transaction => {
        Logger.info(
          `Processing transaction release : ${transaction.transaction_id}`
        );
        const response = await TransctionHelper.releaseTransaction(
          transaction.wallet,
          transaction
        );
        console.log("Released", transaction, response);
      });
    });
});
