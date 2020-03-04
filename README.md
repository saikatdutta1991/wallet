# Wallet Service
A standalong virtual wallet service that can be used in any project. It has public HTTP apis for creating, crediting, debiting, managing virtual wallets.

## Features
- Creating wallet
- Crediting wallet
- Debiting wallet
- Hold money for certain time before debiting
- Release on hold money automatically
- Delete wallet
- Fetch transactions
- Search transactions by filtering parameters

## Used Libraries
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

## Directory Structure
```shell
|-- Root Directroy (wallet)
    |-- .env --> Environment variables( run time will be cloned from specific .env )
    |-- .env.development --> Environment variables for development
    |-- .env.production --> Environment variables for production
    |-- knexfile.js --> Config for knex migration commands
    |-- package.json --> Node packages list
    |-- bin --> Custom npm & usefull shell scripts
    |-- docs --> Documentations
    |-- src
        |-- main
            |-- index.js --> Entry point for express server
            |-- app
            |   |-- controllers --> Controllers files
            |   |-- crons --> Cron jobs & files in this directory imported automatically
            |   |-- helpers --> All sort of helpers
            |   |-- middlewares --> All sort of middlewares
            |   |-- models --> All modes should be here
            |   |-- routes --> Routes & files in this directory imported automatically
            |-- boot --> Booting utilities
            |-- config --> App configurations
            |   |-- api.js --> Api related configs & constants
            |   |-- database.js --> Databse configuration
            |-- database --> Databasse table migrations and seeds
```

## Environment Setup
```shell
 Create .env.development & .env.production files in root directory.
 Clone the .env.sample into above two files and change the values accordingly.
```

## Run
```javascript
 Open terminal and move to the root directory.  Do the following steps :
 
 # Insall npm dependencies.
 > npm install
 
 # Run migration to create tables
 > NODE_ENV=development ./node_modules/.bin/knex migrate:latest
 
 # To start server
 > npm run dev
 	or
 > npm run prod
 
 *Note :  if heroku set the .env
```

## Links
- [Postman v1 HTTP Api docs](https://documenter.getpostman.com/view/3133283/SzKVQJ7Y "Postman v1 HTTP Api docs")
- [APIDOC.md](https://github.com/saikatdutta1991/wallet/blob/master/docs/APIDOC.md "APIDOC.md")
- [heroku demo](https://wallet-service-v1.herokuapp.com "APIDOC.md")

