 **Steps for Back up an offline database from the CORE cluster**  **Stop service neo4j on one of the follower instance to get data backup.** 

 **1.Create database dump on virtual server.** 


1. mkdir /tmp/neo4j-seed


1. chmod -R 777 /tmp/neo4j-seed


1. service neo4j stop


1. su - neo4j


1. /usr/bin/neo4j-admin dump --database=moviesdb --to=/tmp/neo4j-seed/moviesdb.dump


1. /usr/bin/neo4j-admin dump --database=system --to=/tmp/neo4j-seed/system.dump





 **2.Copy the server dump to local machine, From local machine terminal.** 


1. scp -i /Users/vedantbhavsar/.ssh/fulcrum-do-20201214 [root@165.232.153.177](mailto:root@165.232.153.177):/tmp/neo4j-seed/moviesdb.dump /Users/vedantbhavsar/Documents/neo4j-seed/moviesdb.dump


1. scp -i /Users/vedantbhavsar/.ssh/fulcrum-do-20201214 [root@165.232.153.177](mailto:root@165.232.153.177):/tmp/neo4j-seed/system.dump /Users/vedantbhavsar/Documents/neo4j-seed/system.dump





 **3.Copy the local machine dump to server, From local machine terminal.** 


1. scp -i /Users/vedantbhavsar/.ssh/fulcrum-do-20201214 /Users/vedantbhavsar/Documents/neo4j-seed/moviesdb.dump [root@165.232.145.140](mailto:root@165.232.145.140):/neo4j-seed/moviesdb.dump


1. scp -i /Users/vedantbhavsar/.ssh/fulcrum-do-20201214 /Users/vedantbhavsar/Documents/neo4j-seed/system.dump [root@165.232.145.140](mailto:root@165.232.145.140):/neo4j-seed/system.dump





 **4.Load data to neo4j database** 

If a cluster holds a previous version of any of the databases being seeded, you must DROP those databases before seeding. Alternatively, you can stop every instance, unbind them from the cluster using [neo4j-admin unbind](https://neo4j.com/docs/operations-manual/current/tools/unbind/#neo4j-admin-unbind) and then forcefully restore the correct seeds (backups) for the databases in question. If you do not DROP or unbind before seeding, either with neo4j-admin restore or neo4j-admin load, the database’s store files and cluster state will be out of sync, potentially leading to logical corruptions.


1. (Stop and unbind all instances who is in the cluster for avoid Error : Store copy failed due to store ID mismatch )


1. neo4j-admin unbind


1. neo4j-admin load --from=/neo4j-seed/movies.dump --database=movies --force


1. neo4j-admin load --from=/neo4j-seed/system.dump --database=system --force





*****

[[category.storage-team]] 
[[category.confluence]] 
