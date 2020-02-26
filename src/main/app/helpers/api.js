const { apiAuthKey, codes } = require("../../config/api");
const logger = require("./logger");

module.exports.isAuthorized = token => {
  return token === apiAuthKey;
};

/** sends generic api json response */
module.exports.sendResponse = (
  response,
  status,
  success,
  type,
  message,
  data
) => {
  response.status(status).json({
    success: success,
    type: type,
    message: message,
    data: data
  });
};

module.exports.sendUnauthorizedResponse = response => {
  logger.error("Unauthorized access invoked.");
  this.sendResponse(
    response,
    codes.UNAUTHORIZED,
    false,
    "UNAUTHORIZED",
    "Unauthorized acess"
  );
};
