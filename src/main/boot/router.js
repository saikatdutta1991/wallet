/**
 * This router class loads all routes ./src/main/routes/*.*.js files.
 */
const fs = require("fs");
const path = require("path");
const _ = require("lodash");

class Router {
  constructor(app) {
    this.app = app;
    this.path = path.join(__dirname, "../app/routes");
  }
  load() {
    fs.readdirSync(this.path).forEach(file => {
      const { prefix, router } = require(path.join(this.path, file));
      this.app.use(prefix, router);
    });
  }
}

module.exports = Router;
