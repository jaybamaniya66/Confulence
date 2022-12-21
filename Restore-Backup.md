1incompleteTake backup of database and neo4j conf file from core server.2incompletebin/neo4j-admin backup --backup-dir=/tmp/4.3.2 --database=movies1 --include-metadata=all3incompleteCompressed : tar -pc -C  "/tmp/port_backup/system" . | gzip -v -1 >  "/tmp/port.tar.gz"4incompleteFollow backup and restore process as neo4j version given in referance link.5incompleteLatest Stable neo4j version commands.6incompletewget -O - [https://debian.neo4j.com/neotechnology.gpg.key](https://debian.neo4j.com/neotechnology.gpg.key) | sudo apt-key add -7incompleteecho 'deb [https://debian.neo4j.com](https://debian.neo4j.com) stable latest' | sudo tee /etc/apt/sources.list.d/neo4j.list8incompletesudo apt-get update9incompletesudo apt-get install neo4j-enterprise10incompleteservice neo4j status11incompleteservice neo4j stop12incompleteRestored your backup database on all servers in the cluster.13incompletebin/neo4j-admin restore --from=/tmp/4.3.2/movies1 --database=movies114incompleteUn-compressed: tar -xzf port.tar.gz15incompleteFollow the backup and restore process as neo4j version given in the reference link.16incompleteUpdate DNS.


```
dbms.allow_upgrade=true

dbms.memory.heap.initial_size=1900m
dbms.memory.heap.max_size=1900m

dbms.memory.pagecache.size=524500k

dbms.default_listen_address=0.0.0.0

dbms.default_advertised_address=137.184.118.9
dbms.connector.bolt.listen_address=0.0.0.0:7687
dbms.connector.bolt.advertised_address=137.184.118.9:7687

dbms.connector.http.listen_address=0.0.0.0:7474
dbms.connector.http.advertised_address=137.184.118.9:7474


dbms.mode=CORE
causal_clustering.minimum_core_cluster_size_at_runtime=3
causal_clustering.initial_discovery_members=137.184.118.9:5000,137.184.118.24:5000,137.184.118.29:5000

```






Reference:

[https://neo4j.com/docs/operations-manual/4.1/tutorial/causal-backup-restore-db/#tutorial-prepare-to-backup](https://neo4j.com/docs/operations-manual/4.1/tutorial/causal-backup-restore-db/#tutorial-prepare-to-backup)

[https://neo4j.com/docs/operations-manual/current/tools/cypher-shell/#cypher-shell-commands](https://neo4j.com/docs/operations-manual/current/tools/cypher-shell/#cypher-shell-commands)

[https://neo4j.com/docs/cypher-manual/current/databases/](https://neo4j.com/docs/cypher-manual/current/databases/)



*****

[[category.storage-team]] 
[[category.confluence]] 
