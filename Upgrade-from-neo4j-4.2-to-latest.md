Step 1:  Check the version of the server for the cluster


```
neo4j version
```
Step 2: Upgrade the neo4j to the desired version you want by applying the following steps: 


```
wget -O - https://debian.neo4j.com/neotechnology.gpg.key | sudo apt-key add -
echo 'deb https://debian.neo4j.com stable latest' | sudo tee /etc/apt/sources.list.d/neo4j.list
sudo apt-get update
sudo apt-get install neo4j-enterprise 
#check the version for neo4j: 
neo4j version
```
Step 3: Change the apoc lib: 


```
#check the version from:
/var/lib/neo4j/labs

cd /var/lib/neo4j/plugins (remove old one)
wget https://github.com/neo4j-contrib/neo4j-apoc-procedures/releases/download/4.4.0.6/apoc-4.4.0.6-all.jar

#change the owner for the apoc lib:
chown neo4j:adm apoc-4.4.0.6-all.jar
```
Step 4: Change the config file to the lastest one: 


```
nano /etc/neo4j/neo4j.conf
#change the owner for the neo4j conf:
chown neo4j:adm neo4j.conf 
```
Step 5: Restart the neo4j service : 


```
service neo4j restart
service neo4j status
```




*****

[[category.storage-team]] 
[[category.confluence]] 
