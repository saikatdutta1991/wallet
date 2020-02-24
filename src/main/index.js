const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./app/helpers/logger');
const Router = require('./boot/router');
const port = process.env.PORT;

/** creating app instance */
const app = express();


/** cross domain api call */
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    next();
});
/** cross domain api call end*/

/** setup body parsers */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
/** setup body parsers end*/

/** booting app start */
const router = new Router(app); // this router is not express router
router.load();
/** booting app end */

app.listen(port, () => logger.info(`Server started & listening on port ${port}`));