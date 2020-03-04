# Wallet Service
A standalong virtual wallet service that can be used in any project. It has public HTTP apis for creating, crediting, debiting, managing virtual wallets.

##Features
- Creating wallet
- Crediting wallet
- Debiting wallet
- Hold money for certain time before debiting
- Release on hold money automatically
- Delete wallet
- Fetch transactions
- Search transactions by filtering parameters

##Used Libraries
|  Name | Version  | Use  |
| ------------ | ------------ | ------------ |
| @hapi/joi  | ^17.1.0  | Request param validations  |
| body-parser | ^1.19.0  | Parse json request body  |
| dotenv  | ^8.2.0  | .env file parsing and environment setup  |
| express | ^4.17.1  | Core framework of this project  |
| knex  | ^0.20.10  | Mysql query builder  |
| lodash | ^4.17.15  | Array, Object manipulation  |
| log4js | ^6.1.2  | Loging server activity with types  |
| moment | ^2.24.0  | Managing times & dates  |
| mysql | ^2.18.1  | Mysql driver for nodejs |
| node-cron | ^2.0.3  | For handling cron jobs Ex: auto release on hold money  |
| nodemon | ^2.0.2  | For watch file changes and re-start server at development  |
| objection  | ^2.1.3  | This is ORM Library for mysql  |
| objection-guid  | ^3.0.2  | Auto generate guid for record  |

##Directory Structure
```shell
|-- Projects
    |-- .env
    |-- .env.development
    |-- .env.sample
    |-- .gitignore
    |-- README.md
    |-- directoryList.md
    |-- knexfile.js
    |-- package-lock.json
    |-- package.json
    |-- bin
    |   |-- dev.sh
    |   |-- prod.sh
    |-- docs
    |   |-- APIDOC.md
    |-- src
        |-- main
            |-- index.js
            |-- app
            |   |-- controllers
            |   |   |-- transaction.js
            |   |   |-- wallet.js
            |   |-- crons
            |   |   |-- releaseTransactions.js
            |   |-- helpers
            |   |   |-- api.js
            |   |   |-- date.js
            |   |   |-- knex.js
            |   |   |-- logger.js
            |   |   |-- queryChunk.js
            |   |   |-- transaction.js
            |   |-- middlewares
            |   |   |-- apiAuthCheck.js
            |   |-- models
            |   |   |-- base.js
            |   |   |-- chunkQueryBuilder.js
            |   |   |-- transaction.js
            |   |   |-- wallet.js
            |   |-- routes
            |       |-- api.js
            |-- boot
            |   |-- cron.js
            |   |-- router.js
            |-- config
            |   |-- api.js
            |   |-- database.js
            |-- database
                |-- migrations
                    |-- 20200222010223_wallets_tables.js
```

