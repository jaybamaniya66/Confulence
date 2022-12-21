

 **Step 1:**  Deploy/create a new webserver on DigitalOcean. 



 **Step 2:**  Install Node-exporter and complete the further required process for monitoring that server.



 **Step 3:**  Instructions used to install a node.js webserver on digital ocean.

sudo apt-get update

curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -

sudo apt-get install -y nodejs

sudo apt-get install build-essential libssl-dev

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

echo "deb [https://dl.yarnpkg.com/debian/](https://dl.yarnpkg.com/debian/) stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt update

sudo apt install yarn

npm install pm2@latest -g

sudo apt-get install nginx

systemctl start nginx



 **Step 4:**  Install [[Nginxlog-exporter|Nginxlog_exporter]]



*****

[[category.storage-team]] 
[[category.confluence]] 
