The step-by-step instructions to move your WordPress site to a new location on the same server:

 **Step 1:**  Backup site Files via File manager/Filezilla/scp command.


* Download 


    * wp-content folder.


    * wp-config.php.



    

 **Step 2:**  Backup (Export) Database you need from MySQL.


```
mysqldump -u root -p --all-databases > /root/backup/wordpressall.sql

ls -al /root/backup/
```

* Once you execute this command, you will be prompted for your database password. Type in the password if you don’t have one then just hit enter.


* Now you can download the resulting SQL file. Connect to your server with FTP / scp command, navigate to the directory where you created the dump file, and download it to your local machine.



 **Step 3:**  Install WordPress at the new server.


* It will create your new admin user account for WordPress. by adding Email, Username and Password.



[https://www.digitalocean.com/community/tutorials/how-to-use-the-wordpress-one-click-install-on-digitalocean-2](https://www.digitalocean.com/community/tutorials/how-to-use-the-wordpress-one-click-install-on-digitalocean-2)


* Upload/replace wp-content folder, wp-config.php, and database.sql files to your new machine Using Filezilla /scp command.



 **Step 4:** Import Database on a new server.

If User exists then Drop the user from MySQL and re-created it: [https://phoenixnap.com/kb/remove-delete-mysql-user](https://phoenixnap.com/kb/remove-delete-mysql-user)


```
mysql

//Set a path where you have backup sql file.
source /var/www/html/New/wordpressall.sql
```

* The following commands are on the MySQL command line to update the values of “home” “siteurl“ in the database with a new URL.




```
SELECT * FROM wp_options WHERE option_name = 'home';
UPDATE wp_options SET option_value="http://testing.fulcrumsaas.com" WHERE option_name = "home";

SELECT * FROM wp_options WHERE option_name = 'siteurl';
UPDATE wp_options SET option_value="http://testing.fulcrumsaas.com" WHERE option_name = "siteurl";
```

* Once the above changes have been made, you should once again be able to access your WordPress login page.



 **Step 5:**  Test your URL and Login to your WordPress admin page by using credentials.

 **Problem Face:** WordPress wp-admin redirect problem

[https://bobcares.com/blog/wordpress-wp-admin-redirect-problem/](https://bobcares.com/blog/wordpress-wp-admin-redirect-problem/)

 **Step 6:**   Find and replace all image/file paths to new URL manually or use a plugin (Velvet Blues Updates URL's)

 **Step 7:**  Delete old files and backup the new site.

Note: whenever you are taking a snapshort , run below commands to open ports for that server : 


```
iptables -S
iptables -A INPUT -p tcp --dport 9100 -j ACCEPT
iptables -A OUTPUT -p tcp --dport 9100 -j ACCEPT
```


 **Referance Links:** 

[https://wordpress.org/support/article/moving-wordpress/](https://wordpress.org/support/article/moving-wordpress/)

[https://mediatemple.net/community/products/dv/204403864/export-and-import-mysql-databases](https://mediatemple.net/community/products/dv/204403864/export-and-import-mysql-databases)

[https://stackoverflow.com/questions/15557718/after-migration-of-wordpress-website-i-cant-access-the-admin-white-page](https://stackoverflow.com/questions/15557718/after-migration-of-wordpress-website-i-cant-access-the-admin-white-page)

[https://precisionsec.com/changing-the-wordpress-site-url-using-the-mysql-command-line/](https://precisionsec.com/changing-the-wordpress-site-url-using-the-mysql-command-line/)

[https://www.youtube.com/watch?v=wROa37k_RQA](https://www.youtube.com/watch?v=wROa37k_RQA)



FYI: For install Wordpress  [https://ubuntu.com/tutorials/install-and-configure-wordpress#3-install-wordpress](https://ubuntu.com/tutorials/install-and-configure-wordpress#3-install-wordpress)



*****

[[category.storage-team]] 
[[category.confluence]] 
