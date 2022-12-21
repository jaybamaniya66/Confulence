Step 1: Installing Nginx


```
sudo apt update
sudo apt install nginx
```
Step 2 – Adjusting the Firewall 
```
sudo ufw app list
```
Note: if you want to access http for nginx then run : 


```
sudo ufw allow 'Nginx HTTP'
sudo ufw status
```
Step 3: to check the nginx server in the browser:


```
curl -4 icanhazip.com --> (it will show the ip)
http://ip (Ex: 127.0.0.1)
```
Step 4: Managing the Nginx Process


```
sudo systemctl stop nginx
sudo systemctl start nginx
sudo systemctl restart nginx
sudo systemctl reload nginx
sudo systemctl disable nginx
sudo systemctl enable nginx
```
Step 5: Setting Up Server Blocks (Note: Replace your_domain with your original domain name )


```
sudo mkdir -p /var/www/your_domain/html
```
Assign ownership to the html: 


```
sudo chown -R jay:jay /var/www/your_domain/html
```
For Demo, Create index.html inside html folder: 


```
nano /var/www/your_domain/html/index.html
```
Add Sample:


```
<html>
    <head>
        <title>Welcome to your_domain!</title>
    </head>
    <body>
        <h1>Success! The your_domain server block is working!</h1>
    </body>
</html>
```
Step 6: To Serve the block 


```
sudo nano /etc/nginx/sites-available/your_domain
```
Add the following in the configuration block: 


```
server {
        listen 80;
        listen [::]:80;

        root /var/www/your_domain/html;
        index index.html index.htm index.nginx-debian.html;

        server_name your_domain.com www.your_domain;

        location / {
                try_files $uri $uri/ =404;
        }
}
```
Create a symblink with site enabled: 


```
sudo ln -s /etc/nginx/sites-available/your_domain /etc/nginx/sites-enabled/
```
Open nginx conf file and uncomment the following in the http portion:


```
http {
    ...
    server_names_hash_bucket_size 64;
    ...
}
```
Test the conf file with : 


```
sudo nginx -t
sudo systemctl restart nginx
```
For Logs : 


```
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```


*****

[[category.storage-team]] 
[[category.confluence]] 
