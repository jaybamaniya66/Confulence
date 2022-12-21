Steps need to install SSL cert on WordPress.



1.Add below HTTPS config into /etc/apache2/sites-enabled/000-default.conf file


```
<VirtualHost *:443>
        ServerAdmin webmaster@localhost

        ServerName landing.fulcrumsaas.com
        ServerAlias www.landing.fulcrumsaas.com

        SSLEngine on
        SSLCertificateFile    /etc/ssl/certs/STAR_fulcrumsaas_com.pem
        SSLCertificateKeyFile    /etc/ssl/private/fulcrumsaas_com.key

        DocumentRoot /var/www/html

        <Directory /var/www/html/>
            Options FollowSymLinks
            AllowOverride All
            Require all granted
        </Directory>

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```
 Note : verify SSL certificate form landing page (landing page of fulcrumsaas : [https://landing.fulcrumsaas.com/](https://landing.fulcrumsaas.com/) )

   certificate : STAR_fulcrumsaas_com.pem

    key : fulcrumsaas_com.key



2.Check configuration in apache file and restart and status.


```
apache2ctl configtest 
systemctl restart apache2 
systemctl status apache2
```


3.Need to update your WordPress and site URL address fields by replacing http with https.

In Settings >> General make sure to Save changes.



4.Need to set up WordPress redirects from HTTP to HTTPS by adding the following code to your /var/www/html/.htaccess file.


```
RewriteCond %{HTTPS} on [OR]
RewriteCond %{SERVER_PORT} ^443$ [OR]
RewriteCond %{HTTP:X-Forwarded-Proto} https
RewriteRule .* - [E=WPR_SSL:-https]] ]></ac:plain-text-body></ac:structured-macro><p>OR </p><p>4.Add the follwing if the above two doesnt works:</p><p>&lt;IfModule mod_rewrite.c&gt;<br />RewriteEngine On<br />RewriteBase /<br />RewriteCond %{HTTPS} off<br />RewriteRule ^(.*)$ <a href="#">https://%{HTTP_HOST}%{REQUEST_URI}</a> [L,R=301]<br />RewriteRule ^index.php$ - [L]<br />RewriteCond %{REQUEST_FILENAME} !-f<br />RewriteCond %{REQUEST_FILENAME} !-d<br />RewriteRule . /index.php [L]<br />&lt;/IfModule&gt;</p><p>OR</p><p>4.Add the following if the above doesn&rsquo;t works:</p><p>&lt;IfModule mod_rewrite.c&gt;<br />RewriteEngine On<br />RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]<br />RewriteBase /<br />RewriteRule ^index.php$ - [L]<br />RewriteCond %{REQUEST_FILENAME} !-f<br />RewriteCond %{REQUEST_FILENAME} !-d<br />RewriteRule . /index.php [L]<br />RewriteCond %{HTTPS} off<br />RewriteRule ^(.*)$ <a href="https://example.com/$1">https://example.com/$1</a>  [L,R=301]<br />&lt;/IfModule&gt;</p><p>5.Add the following code above the&nbsp;<em>&ldquo;That&rsquo;s all, stop editing!&rdquo;</em>&nbsp;line in your wp-config.php file</p><ac:structured-macro ac:name="code" ac:schema-version="1" ac:macro-id="a20b15c4-f9b4-4cd1-b79a-7ecc8bd8c63a"><ac:plain-text-body><![CDATA[if ($_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https') $_SERVER['HTTPS']='on';
```










*****

[[category.storage-team]] 
[[category.confluence]] 
