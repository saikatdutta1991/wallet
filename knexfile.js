/** While migrating, knexJS can't find evn values, so loading env */
const envFilePath = `${__dirname}/.env.${process.env.NODE_ENV}`;
require("dotenv").config({
  path: envFilePath
});

module.exports = require("./src/main/config/database");
