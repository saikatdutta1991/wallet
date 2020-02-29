echo "Starting developement environment ..";

envFile=".env";
devEnvFile=".env.development";
 
echo 'Removing old .env file ..';
if [ -f "$envFile" ]
then
    rm "$envFile"
fi

echo 'Copy contents from .env.development > .env ..';
if [ -f "$devEnvFile" ]
then
    cp "$devEnvFile" "$envFile"
else
    echo "$devEnvFile could not be found so exiting..";
    exit 1;
fi

echo 'Starting node src/main/index.js'
DOTENV_CONFIG_PATH=$(pwd)/.env nodemon -r dotenv/config src/main/index.js