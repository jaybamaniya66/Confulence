Step1: Transfer the backup tar file to the core server where you are taking backup:


```
- Apply the above command to the server where the you are taking the backup for listing:
Start listening for the file on the destination machine:  
nc -l 3333 | pv > /var/lib/neo4j/data/databases/20220914.tar.gz
- Apply the above command to the server from where you are sending the tar file:
Start sending file from the source machine (ip address must be of the destination server) :
nc -w 3 161.35.227.11 3333 < /db-backup-archive/full/hyp-neo-v2-02/euclid/20220914.tar.gz
```
Step2: untar the file in the destination folder: 


```
tar -xzf /var/lib/neo4j/data/database/20220914.tar.gz
```
Step3: Make a folder in transaction folder (make sure the name must be match with untar file as well as database name) : 


```
mkdir /var/lib/neo4j/data/transaction/log/
```
Step4: Restart the neo4j service:


```
service neo4j restart
```
Step5: Create database log in by going the browser for the particular cluster:


```
create database log;
```
Step6: check the node label with the source server.



Note: for the folder to be copied: ( jay is the folder name and you have to install apt-install-ucompress in the sender servere)


```
sender:  tar cfp - jay | compress -c | nc -w 3 157.245.214.93 3333
receiver: nc -l -p 3333 | uncompress -c | tar xvfp -
```


*****

[[category.storage-team]] 
[[category.confluence]] 
