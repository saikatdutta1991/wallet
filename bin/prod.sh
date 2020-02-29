echo "Starting production environment ..";

envFile=".env";
prodEnvFile=".env.production";
 
echo 'Removing old .env file ..';
if [ -f "$envFile" ]
then
    rm "$envFile"
fi

echo 'Copy contents from .env.development > .env ..';
if [ -f "$prodEnvFile" ]
then
    cp "$prodEnvFile" "$envFile"
else
    echo "$prodEnvFile could not be found so exiting..";
    exit 1;
fi

echo 'Starting node src/main/index.js'
DOTENV_CONFIG_PATH=$(pwd)/.env node -r dotenv/config src/main/index.js