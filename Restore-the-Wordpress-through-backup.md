step 1: check the backup of wordpress .


```
cd /var/local/backup/archive
```
step 2: Untar the latest backup file (below file is just the example) & after the untar the file


```
tar -xzf stage-wordpress-20220511.tar.gz
```
step 3: move both html folder and wordpress sql file to 


```
mv html/ /var/www/
mv  wordpress-20220511.sql /var/www/
```
Go to the wp-config.php file and check the password as well : 

step 4: Go to mysql & drop the old user : 


```
mysql 
show databases;
==> drop wordpress databases:
drop database wordpress;
==> Drop the user:
SELECT User, Host FROM mysql.user;
DROP USER 'wordpress'@'localhost';
```
step 5: Create the wordpress databases & create the user as well :

Note : Password will varies as per the user, set “wordpress“ if you are using localhost.


```
mysql> CREATE DATABASE wordpress;
Query OK, 1 row affected (0,00 sec)

mysql> CREATE USER wordpress@localhost IDENTIFIED BY '3aba2eed7283d8228690061ee333f6ad5a747b4ca21182c6';
Query OK, 1 row affected (0,00 sec)

mysql> GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP,ALTER
    -> ON wordpress.*
    -> TO wordpress@localhost;
Query OK, 1 row affected (0,00 sec)

mysql> FLUSH PRIVILEGES;
Query OK, 1 row affected (0,00 sec)

mysql> quit
```
step 6: Give the path to the source of sql file . (wordpressall.sql file will be the backup which is utar )


```
mysql

//Set a path where you have backup sql file.
source /var/www/wordpressall.sql
```

* The following commands are on the MySQL command line to update the values of “home” “siteurl“ in the database with a new URL. (eg : http://testing.fulcrumsaas.com)




```
SELECT * FROM wp_options WHERE option_name = 'home';
UPDATE wp_options SET option_value="http://testing.fulcrumsaas.com" WHERE option_name = "home";

SELECT * FROM wp_options WHERE option_name = 'siteurl';
UPDATE wp_options SET option_value="http://testing.fulcrumsaas.com" WHERE option_name = "siteurl";
```
step 7: Go to the browser and check whether the site is working or not & even login in wp-admin as well .



*****

[[category.storage-team]] 
[[category.confluence]] 
