#!/bin/bash

# any future command that fails will exit the script
set -e

# Delete the old repo
rm -rf /home/ubuntu/praesidium/

# clone the repo again
git clone git@gitlab.com:praesidiumgroup/praesidium.git

#source the nvm file. In an non
#If you are not using nvm, add the actual path like
# PATH=/home/ubuntu/node/bin:$PATH
source /home/ubuntu/.nvm/nvm.sh

# stop the previous pm2
pm2 kill
npm remove pm2 -g


#pm2 needs to be installed globally as we would be deleting the repo folder.
# this needs to be done only once as a setup script.
npm install pm2 -g
# starting pm2 daemon
pm2 status

cd /home/ubuntu/praesidium

echo "arg2 " $2
echo "arg3 " $3

echo $3

#create AWS_PRIVATE_KEY
touch AWS_PRIVATE_KEY.pem
printf "%s" "$2" > AWS_PRIVATE_KEY.pem

#create.env
touch .env.pem
printf "%s" "$1" > .env

#install npm packages
echo "Running npm install"
npm install

#Restart the node server
pm2 start ./bin/www