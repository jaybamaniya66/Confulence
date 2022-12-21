Prerequisites:

A sudo user on your server, and an apache server setup.



 **Step 1:** Add user and create/change password with home directory and make a directory inside it.


```
useradd -m marketing
passwd marketing
mkdir -p /home/marketing/upload
```


 **Step 2:** Change owner to root for getting access to sftp.


```
chown -R root:root /home/marketing
```


 **Step 3:**  Change inside folder owner to marketing so user only have access of that folder.   


```
chown marketing:marketing /home/marketing/upload
```


 **Step 4:**  Create a group and add the user into that group.

       


```
groupadd sftponly
usermod -G sftponly marketing
tail -n5 /etc/group
```


 **Step 5:**  User can’t access shell so give no login and assign Root directory to the user.

       


```
usermod -s /usr/sbin/nologin -d /home/marketing/ marketing
tail -n5 /etc/passwd
```


 **Step 6:** Make some changes into sshd_config file in sftpserver. Then restart service sshd


```
nano /etc/ssh/sshd_config
```

```
# To disable tunneled clear text passwords, change to no here!
PasswordAuthentication Yes

#Subsystem    sftp    /usr/lib/openssh/sftp-server
Subsystem sftp internal-sftp
Match Group sftponly
ChrootDirectory %h
ForceCommand internal-sftp
```

```
service sshd restart
service sshd status
```


 **Step 7:**  Find a virtual host config file to make the alias and for sftp folder available on the browser.      


```
nano /etc/apache2/sites-enabled/000-default.conf
```

```
# Added to mitigate CVE-2017-8295 vulnerability
UseCanonicalName On
<VirtualHost *:80>
        ServerAdmin webmaster@localhost
        ServerName stage.fulcrumsaas.com
        ServerAlias www.stage.fulcrumsaas.com
        
        DocumentRoot /var/www/html
        Alias /marketing /home/marketing
        <Directory /var/www/html/>
            Options FollowSymLinks
            AllowOverride All
            Require all granted
        </Directory>
        <Directory /home/marketing/>
            AuthType Basic
        AuthName "Restricted Content"
        AuthUserFile /etc/apache2/.htpasswd
        Options +Indexes +FollowSymLinks
            AllowOverride All
            Require valid-user
        </Directory>

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```


 **Step 8:**  For checking config in apache file, and restart and status.


```
apachectl configtest
systemctl restart apache2
systemctl status apache2
```
 **Step 9:**  check on the browser and Via Filezilla that our users can upload and download files.

       


```
From browser (apache popup for user/pass)
Username:xyz
Password:xyz
```

```
From FileZilla 
host:.com or public-ip         
Port:22 (by default for SFTP)
Username:xyz        
Password:xyz
```


 **Reference:** 

[https://askubuntu.com/questions/630774/web-root-alias-directory](https://askubuntu.com/questions/630774/web-root-alias-directory)

[https://www.digitalocean.com/community/tutorials/how-to-enable-sftp-without-shell-access-on-ubuntu-16-04](https://www.digitalocean.com/community/tutorials/how-to-enable-sftp-without-shell-access-on-ubuntu-16-04)

[https://www.digitalocean.com/community/tutorials/how-to-set-up-password-authentication-with-apache-on-ubuntu-16-04](https://www.digitalocean.com/community/tutorials/how-to-set-up-password-authentication-with-apache-on-ubuntu-16-04)



*****

[[category.storage-team]] 
[[category.confluence]] 
