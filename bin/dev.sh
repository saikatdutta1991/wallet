echo "Starting developement environment";

DOTENV_CONFIG_PATH=$(pwd)/.env.development nodemon -r dotenv/config src/main/index.js