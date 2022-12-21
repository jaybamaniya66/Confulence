455incomplete **Setup parallel cluster** 428incompleteCreate droplets.429incompleteSetup the firewall.430incompleteInstall neo4j with an appropriate configuration431incompleteRegular config changes456incompleteUpdate the apoc library by cp from lib folder to plugin.457incompleteIP changes for cluster migration 432incompleteOne node with IPs of all the old and new cluster nodes458incompleteThe remaining nodes will have IPs of new cluster nodes only


```
causal_clustering.initial_discovery_members=
```
435incomplete **Validate cluster state** 459incompleteCheck the logs for any errors460incompleteAccess the Neo4j browser interface using the IP of one of the nodes of the newer cluster461incompleteFire up read queries436incomplete **DNS cut-over** 462incompleteUpdate the DNS with IPs of newer cluster nodes.463incompleteWait for TTL time period(usually 300 secs) then try accessing the Neo4j browser console with DNS and follow the Validate cluster state step.464incomplete **Detach the older cluster from the new cluster** 465incompleteUpdate the config to remove the IPs of older cluster nodes from the new cluster node466incompleteNeo4j service restart467incompleteFollow the Validate cluster state step.437incomplete

*****

[[category.storage-team]] 
[[category.confluence]] 
