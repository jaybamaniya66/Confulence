
### Step 1: upgrade from v4.1.1 to v4.1.10
455complete **Setup parallel cluster** 428completeCreate droplets.429completeSetup the firewall.430completeInstall neo4j with an appropriate configuration431completeRegular config changes456completeUpdate the apoc library by cp from lib folder to plugin.457completeIP changes for cluster migration 432completeOne node with IPs of all the old and new cluster nodes458completeThe remaining nodes will have IPs of new cluster nodes only


```
causal_clustering.initial_discovery_members=
```
435complete **Validate cluster state** 459completeCheck the logs for any errors460completeAccess the Neo4j browser interface using the IP of one of the nodes of the newer cluster461completeFire up read queries436complete **DNS cut-over** 462completeUpdate the DNS with IPs of newer cluster nodes.463completeWait for TTL time period(usually 300 secs) then try accessing the Neo4j browser console with DNS and follow the Validate cluster state step.464complete **Detach the older cluster from the new cluster** 465completeUpdate the config to remove the IPs of older cluster nodes from the new cluster node466completeNeo4j service restart467completeFollow the Validate cluster state step.629complete **Stop neo4j service on the older cluster nodes “one at a time“.** 
### Step 2: upgrade from v4.1.10 to v4.2.11
587complete **Setup parallel cluster** 588completeCreate droplets.589completeSetup the firewall.590completeInstall neo4j with an appropriate configuration591completeRegular config changes592completeUpdate the apoc library by cp from lib folder to plugin.593completeIP changes for cluster migration 594completeOne node with IPs of all the old and new cluster nodes595completeThe remaining nodes will have IPs of new cluster nodes only


```
causal_clustering.initial_discovery_members=
```
596complete **Validate cluster state** 597completeCheck the logs for any errors598completeAccess the Neo4j browser interface using the IP of one of the nodes of the newer cluster599completeFire up read queries600complete **DNS cut-over** 601completeUpdate the DNS with IPs of newer cluster nodes.602completeWait for TTL time period(usually 300 secs) then try accessing the Neo4j browser console with DNS and follow the Validate cluster state step.603complete **Detach the older cluster from the new cluster** 604completeUpdate the config to remove the IPs of older cluster nodes from the new cluster node605completeNeo4j service restart606completeFollow the Validate cluster state step.630complete **Stop neo4j service on the older cluster nodes “one at a time“.** 
### Step 3: upgrade from v4.2.11 to v4.3.5
607complete **Setup parallel cluster** 608completeCreate droplets.609completeSetup the firewall.610completeInstall neo4j with an appropriate configuration611completeRegular config changes612completeUpdate the apoc library by cp from lib folder to plugin.613completeIP changes for cluster migration 614completeOne node with IPs of all the old and new cluster nodes615completeThe remaining nodes will have IPs of new cluster nodes only


```
causal_clustering.initial_discovery_members=
```
616complete **Validate cluster state** 617completeCheck the logs for any errors618completeAccess the Neo4j browser interface using the IP of one of the nodes of the newer cluster619completeFire up read queries620complete **DNS cut-over** 621completeUpdate the DNS with IPs of newer cluster nodes.622completeWait for TTL time period(usually 300 secs) then try accessing the Neo4j browser console with DNS and follow the Validate cluster state step.623complete **Detach the older cluster from the new cluster** 624completeUpdate the config to remove the IPs of older cluster nodes from the new cluster node625completeNeo4j service restart626completeFollow the Validate cluster state step.
### Step 4: Post upgrade steps.
627complete **Install SSL on all nodes “one at a time“.** 628complete **Restart one at a time.** 



*****

[[category.storage-team]] 
[[category.confluence]] 
