const cron = require("node-cron");
const { chunk } = require("../helpers/queryChunk");
const Transaction = require("../models/transaction");

// cron.schedule("*/1 * * * * *", () => {

// }, { scheduled: false });

const query = Transaction.query().where("status", "=", "on_hold");
chunk(query, 1, data => {
  console.log(data);
});
