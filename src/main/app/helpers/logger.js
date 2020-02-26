/** import logger module and getLogger instance */
const logger = require("log4js").getLogger();

/** set logger level */
logger.level = "trace";

module.exports = logger;
