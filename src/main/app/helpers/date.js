const moment = require("moment");

/**
 * This method to validate
 * is given datetime is greater than current time.
 * It assumes, timezone is in utc
 * and takes Date time in format YYYY-MM-DD HH:mm:ss
 */
exports.isSameOrAfter = date => {
  const givenDate = moment.utc(date, "YYYY-MM-DD HH:mm:ss", true);
  if (!givenDate.isValid()) {
    throw new Error("Datetime format YYYY-MM-DD HH:mm:ss");
  }

  if (!givenDate.isSameOrAfter(moment.utc())) {
    throw new Error("Must be same or greater than current time.");
  }

  return date;
};
