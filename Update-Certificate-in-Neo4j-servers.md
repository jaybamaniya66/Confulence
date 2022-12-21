
### Scope

* This page is used for updating the SSL certificate on the neo4j host.




### Prerequisite

* Make sure you have the latest/New/Updated public.crt and private.key.


    * Where you can find private.key and public.crt?


    *  While creating a new SSL cert we need to provide CSR and private.key ← which is managed by Eric.


    * So He will provide you a new_ssl.zip file → Zip file includes all the crt and bundle etc.


    * Suppose the above Zip file doesn't have private.key then you need to ping Eric to provide/share the private key.



    

    


### Steps:

* Step 1: Copy private.key & public.crt (STAR_fulcrumsaas.net.crt) and make sure you don't have extra space/line if you have then remove it.


* Step 2: Below two folders have private.key and public.crt certificates you can Edit or Replace with new files it's on you.




```
cd /var/lib/neo4j/certificates/bolt/
cd /var/lib/neo4j/certificates/https/
```
note
* Before restarting neo4j service, you have to make sure that both the files (private.key & public.crt) have **neo4j**  user and  **adm**  group ownership.


* Also Don't change the naming convention for  **private.key**  and  **public.crt** because it configure in  **_/etc/neo4j/neo4j.conf_**  file.




* Before restarting neo4j service, you have to make sure that both the files (private.key & public.crt) have **neo4j**  user and  **adm**  group ownership.


* Also Don't change the naming convention for  **private.key**  and  **public.crt** because it configure in  **_/etc/neo4j/neo4j.conf_**  file.




* Step 3: To apply SSL changes we need to  **Restart the neo4j service**  (Make sure with Eric for Production restart)



note
* If neo4j nodes are in cluster, then restart the neo4j service one at a time.




* If neo4j nodes are in cluster, then restart the neo4j service one at a time.




```
service neo4j restart
```

* Step 4: Check the SSL Cert. is updated or not → via going to the browser and searching for the endpoint you updated cert and check the SSL cert.










## Quick Steps to install certificates on neo4j servers.



1. Download certificates locally to “C:\temp\star.fulcrumsaas.net” directory.


    1. Option 1 : Manually download certificates to your local temp folder


```
mkdir C:\temp\star.fulcrumsaas.net
mkdir C:\temp\star.fulcrumsaas.net\certificates\bolt
mkdir C:\temp\star.fulcrumsaas.net\certificates\https
copy public.crt C:\temp\star.fulcrumsaas.net\certificates\bolt\public.crt
copy private.key C:\temp\star.fulcrumsaas.net\certificates\bolt\private.key
copy public.crt C:\temp\star.fulcrumsaas.net\certificates\https\public.crt
copy private.key C:\temp\star.fulcrumsaas.net\certificates\https\private.key
```



    1. Option 2 : Download existing certificates from one of the servers


```
mkdir c:/temp/star.fulcrumsaas.net
scp -i .ssh/fulcrum-do-20201214 -r root@142.93.71.47:/var/lib/neo4j/certificates /mnt/c/temp/star.fulcrumsaas.net/
```




    
1. Upload certificates to each target server


```
scp -i .ssh/fulcrum-do-20201214 -r /mnt/c/temp/star.fulcrumsaas.net/certificates root@165.232.142.210:/var/lib/neo4j/
sudo chown -R neo4j:adm /var/lib/neo4j/certificates/
```



1. Restart Neo4j Service on a server


```
systemctl status neo4j.service
systemctl restart neo4j.service
```






*****

[[category.storage-team]] 
[[category.confluence]] 
