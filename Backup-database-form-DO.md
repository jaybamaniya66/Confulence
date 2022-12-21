 **Steps for Backup an online database from the CORE cluster**  **1.Create a directory for Online Backup.** 

mkdir /tmp/backup/

chmod -R 777 /tmp/backup



 **2. Start by changing user to neo4j for online backup of any database and system database.** 

su - neo4j

neo4j-admin backup --backup-dir=/tmp/backup/ --database=moviesdb

neo4j-admin backup --backup-dir=/tmp/backup/ --database=system



 **Copy the server dump to local machine, From local machine terminal.** 


1. scp -i /Users/vedantbhavsar/.ssh/fulcrum-do-20201214 -r root@165.232.145.140:/tmp/backups/moviesdb1 /Users/vedantbhavsar/Documents/neo4j-seed/moviesdb1


1. scp -i /Users/vedantbhavsar/.ssh/fulcrum-do-20201214 -r root@165.232.145.140:/tmp/backups/system /Users/vedantbhavsar/Documents/neo4j-seed/system





 **Copy the local machine dump to server, From local machine terminal.** 


1. scp -i /Users/vedantbhavsar/.ssh/fulcrum-do-20201214 -r /Users/vedantbhavsar/Documents/neo4j-seed/moviesdb1 root@165.232.145.140:/tmp/backups/


1. scp -i /Users/vedantbhavsar/.ssh/fulcrum-do-20201214 -r /Users/vedantbhavsar/Documents/neo4j-seed/system root@165.232.145.140:/tmp/backups/



 

 **3.Information on restore.** 

If a cluster holds a previous version of any of the databases being seeded, you must DROP those databases before seeding. Alternatively, you can stop every instance, unbind them from the cluster using neo4j-admin unbind and then forcefully restore the correct seeds (backups) for the databases in question. If you do not DROP or unbind before seeding, either with neo4j-admin restore or neo4j-admin load, the database’s store files and cluster state will be out of sync, potentially leading to logical corruptions.

Restore: [https://neo4j.com/docs/operations-manual/current/backup-restore/restore-backup/](https://neo4j.com/docs/operations-manual/current/backup-restore/restore-backup/)

Unbind: [https://neo4j.com/docs/operations-manual/current/tools/unbind/#neo4j-admin-unbind](https://neo4j.com/docs/operations-manual/current/tools/unbind/#neo4j-admin-unbind)

DROP DATABASE moviesdb IF EXISTS DESTROY DATA;



 **4.Stop and Unbind for restore.** 

service neo4j stop

neo4j-admin unbind

su - neo4j

neo4j-admin restore --from=/tmp/backup/system --database=system --force

neo4j-admin restore --from=/tmp/backup/moviesdb --database=moviesdb --force

exit

service neo4j start

 **5.Check the database using cypher-shell and try out some queries.** 

SHOW DATABASES;



 **Steps for Backup an offline database from the CORE cluster**  **Stop service neo4j on one of the follower instance to get data backup.** 

 **1.Create database dump on virtual server.** 


1. 
```
mkdir /tmp/neo4j-seed
chmod -R 777 /tmp/neo4j-seed
service neo4j stop
su - neo4j
/usr/bin/neo4j-admin dump --database=moviesdb --to=/tmp/neo4j-seed/moviesdb.dump
/usr/bin/neo4j-admin dump --database=system --to=/tmp/neo4j-seed/system.dump
```




 **2.Copy the server dump to local machine, From local machine terminal.** 


1. 
```
scp -i /Users/vedantbhavsar/.ssh/fulcrum-do-20201214 root@165.232.153.177:/tmp/neo4j-seed/moviesdb.dump /Users/vedantbhavsar/Documents/neo4j-seed/moviesdb.dump
scp -i /Users/vedantbhavsar/.ssh/fulcrum-do-20201214 root@165.232.153.177:/tmp/neo4j-seed/system.dump /Users/vedantbhavsar/Documents/neo4j-seed/system.dump
```




 **3.Copy the local machine dump to server, From local machine terminal.** 


1. 
```
scp -i /Users/vedantbhavsar/.ssh/fulcrum-do-20201214 /Users/vedantbhavsar/Documents/neo4j-seed/moviesdb.dump root@165.232.145.140:/neo4j-seed/moviesdb.dump
scp -i /Users/vedantbhavsar/.ssh/fulcrum-do-20201214 /Users/vedantbhavsar/Documents/neo4j-seed/system.dump root@165.232.145.140:/neo4j-seed/system.dump
```




 **4.Load data to neo4j database** 

If a cluster holds a previous version of any of the databases being seeded, you must DROP those databases before seeding. Alternatively, you can stop every instance, unbind them from the cluster using [neo4j-admin unbind](https://neo4j.com/docs/operations-manual/current/tools/unbind/#neo4j-admin-unbind) and then forcefully restore the correct seeds (backups) for the databases in question. If you do not DROP or unbind before seeding, either with neo4j-admin restore or neo4j-admin load, the database’s store files and cluster state will be out of sync, potentially leading to logical corruptions.


```
DROP Database movie;
```

```
#(Stop and unbind all instances who is in the cluster for avoid Error : Store copy failed due to store ID mismatch )
neo4j-admin unbind
neo4j-admin load --from=/neo4j-seed/movies.dump --database=movies --force
neo4j-admin load --from=/neo4j-seed/system.dump --database=system --force
```
After Loading the above command for offline you have to create the database:


```
Create database movie; (It should match name with dump file which has been created while creating)
```






*****

[[category.storage-team]] 
[[category.confluence]] 
