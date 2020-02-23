const api = require('../helpers/api');

module.exports = (req, res, next) => {
    if (api.isAuthorized(req.headers.authorization)) {
        return next();
    }
    api.sendUnauthorizedResponse(res);
}