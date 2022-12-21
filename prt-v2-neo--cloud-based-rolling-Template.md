
### Step 1: upgrade from v4.3.5 to v4.3.9
577complete **Setup parallel cluster** 578completeCreate droplets.579completeSetup the firewall.580completeInstall neo4j with an appropriate configuration581completeRegular config changes582completeUpdate the apoc library by cp from lib folder to plugin.583completeIP changes for cluster migration 584completeOne node with IPs of all the old and new cluster nodes585completeThe remaining nodes will have IPs of new cluster nodes only


```
causal_clustering.initial_discovery_members=
```
586complete **Validate cluster state** 587completeCheck the logs for any errors588completeAccess the Neo4j browser interface using the IP of one of the nodes of the newer cluster589completeFire up read queries590complete **DNS cut-over** 591completeUpdate the DNS with IPs of newer cluster nodes.592completeWait for TTL time period(usually 300 secs) then try accessing the Neo4j browser console with DNS and follow the Validate cluster state step.593complete **Detach the older cluster from the new cluster** 594completeUpdate the config to remove the IPs of older cluster nodes from the new cluster node595completeNeo4j service restart596completeFollow the Validate cluster state step.597complete **Stop neo4j service on the older cluster nodes “one at a time“.** 
### Step 2: upgrade from v4.3.9 to v4.4.2
598incomplete **Setup parallel cluster** 599incompleteCreate droplets.600incompleteSetup the firewall.601incompleteInstall neo4j with an appropriate configuration602incompleteRegular config changes603incompleteUpdate the apoc library by cp from lib folder to plugin.604incompleteIP changes for cluster migration 605incompleteOne node with IPs of all the old and new cluster nodes606incompleteThe remaining nodes will have IPs of new cluster nodes only


```
causal_clustering.initial_discovery_members=
```
607incomplete **Validate cluster state** 608incompleteCheck the logs for any errors609incompleteAccess the Neo4j browser interface using the IP of one of the nodes of the newer cluster610incompleteFire up read queries611incomplete **DNS cut-over** 612incompleteUpdate the DNS with IPs of newer cluster nodes.613incompleteWait for TTL time period(usually 300 secs) then try accessing the Neo4j browser console with DNS and follow the Validate cluster state step.614incomplete **Detach the older cluster from the new cluster** 615incompleteUpdate the config to remove the IPs of older cluster nodes from the new cluster node616incompleteNeo4j service restart617incompleteFollow the Validate cluster state step.618incomplete **Stop neo4j service on the older cluster nodes “one at a time“.** 
### Step 3: upgrade from v4.2.11 to v4.3.5
619incomplete **Setup parallel cluster** 620incompleteCreate droplets.621incompleteSetup the firewall.622incompleteInstall neo4j with an appropriate configuration623incompleteRegular config changes624incompleteUpdate the apoc library by cp from lib folder to plugin.625incompleteIP changes for cluster migration 626incompleteOne node with IPs of all the old and new cluster nodes627incompleteThe remaining nodes will have IPs of new cluster nodes only


```
causal_clustering.initial_discovery_members=
```
628incomplete **Validate cluster state** 629incompleteCheck the logs for any errors630incompleteAccess the Neo4j browser interface using the IP of one of the nodes of the newer cluster631incompleteFire up read queries632incomplete **DNS cut-over** 633incompleteUpdate the DNS with IPs of newer cluster nodes.634incompleteWait for TTL time period(usually 300 secs) then try accessing the Neo4j browser console with DNS and follow the Validate cluster state step.635incomplete **Detach the older cluster from the new cluster** 636incompleteUpdate the config to remove the IPs of older cluster nodes from the new cluster node637incompleteNeo4j service restart638incompleteFollow the Validate cluster state step.
### Step 4: Post upgrade steps.
639incomplete **Install SSL on all nodes “one at a time“.** 640incomplete **Restart one at a time.** 

*****

[[category.storage-team]] 
[[category.confluence]] 
