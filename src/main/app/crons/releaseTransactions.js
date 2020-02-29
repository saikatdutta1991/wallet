const cron = require("node-cron");
const _ = require("lodash");
const Logger = require("../helpers/logger");
const { chunk } = require("../helpers/queryChunk");
const Transaction = require("../models/transaction");
const TransctionHelper = require("../helpers/transaction");
const { constants } = require("../../config/api");
const Moment = require("moment");

cron.schedule("*/30 * * * * *", () => {
  const query = Transaction.query()
    .where("status", constants.ON_HOLD)
    .where("expires_at", "<", Moment.utc().format("YYYY-MM-DD HH:mm:ss"))
    .withGraphFetched("wallet");

  chunk(query, 10, async transactions => {
    _.each(transactions, async transaction => {
      Logger.info(
        `Processing transaction release : ${transaction.transaction_id}`
      );
      console.log(transaction.status);
      const response = await TransctionHelper.releaseTransaction(
        transaction.wallet,
        transaction
      );
      console.log(transaction.wallet, response);
    });
  });
});
