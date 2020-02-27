/**
 * Cron scheduler
 * Class helps to register all scheduler's handlers along with valid cron expression.
 */
const fs = require("fs");
const path = require("path");

class Cron {
  constructor() {
    this.path = path.join(__dirname, "../app/crons");
  }
  register() {
    fs.readdirSync(this.path).forEach(file => {
      require(path.join(this.path, file));
    });
  }
}

module.exports = Cron;
