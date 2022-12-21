note **Steps for creating Neo4j/Read Replica**  **Steps for creating Neo4j/Read Replica** 1complete **Create a Droplet.** 30complete **Add Firewalls.** 3complete **Install Node Exporter.** 8complete **Create the shell script inside**  **/**  **tmp/ folder.** 31complete **Give script 744 permissions to allow executable.** 32complete **Add Tag to the server for getting metrics on Prometheus: node_exporter,prd** 5complete **Install Neo4j-Enterprise.** 34complete **Install stable Neo4j-Enterprise version which is needed. check by “neo4j version“** 10complete **Stop neo4j service for updating neo4j.conf file.** 35complete **Set Max 1024 open files allowed by checking neo4j-admin memrec. (/etc/security/limits.conf) then reboot the server.** 36complete **Copy certs/keys from the core cluster server. into bolt/https folder in (/var/lib/neo4j/certificate/../ bolt /..https /..)** 41complete **Update Neo4j conf.** 19complete **Check/config neo4j-admin memrec for heap/page cache.** 37complete **Make changes to the casual cluster as required core/read_replica and have all server’s public-ip:5000 port.** 46complete **Add this change bolt thread pool in conf file** ”dbms.connector.bolt.thread_pool_keep_alive=1m”47complete **Configure http/https/bolt connection as required.** 39complete **Enable the Prometheus endpoint. Server**  **public-ip:port number**  **(2004)** 12complete **Add additional libraries.** 42complete **Install Apoc library.** 48completecheck for chown as neo4j:adm45completeRETURN apoc.version()24complete **Start service neo4j** 43complete **Validation Steps** 40complete **tail the /var/log/neo4j/debug.log for monitoring.** 16complete **Check all the port are open : netstat -tunlp.** 17complete **Enable neo4j so if server get reboot/restart neo4j service get start.** 44complete **Setup monitoring** 18complete **Add Tags to the server: neo4j_exporter,prd,prt.** 26complete **Check the server on Prometheus and Grafana.** 

[https://github.com/neo4j-contrib/neo4j-apoc-procedures/releases](https://github.com/neo4j-contrib/neo4j-apoc-procedures/releases)








1. Cluster created \[apoc installed]


    1. name:   log-v2-neo


    1. dns : log-v2-neo.fulcrumsaas.net


    1. url : https://log-v2-neo.fulcrumsaas.net:7473/browser/



    
1. User setup : 


    1. Admin User : neo4j  /  neo4j@123 


    1. Read-only User : sysops  /  design-airport-smart



    
1. Monitoring Setup Completed.


1. Updated Environment Stack Spreadsheet.











*****

[[category.storage-team]] 
[[category.confluence]] 
