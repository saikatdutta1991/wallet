echo "Starting production environment";

DOTENV_CONFIG_PATH=$(pwd)/.env.production node -r dotenv/config src/main/index.js