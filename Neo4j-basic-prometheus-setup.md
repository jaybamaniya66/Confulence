 **Scope** 

This page gives information and configures of the Neo4j environment with Prometheus within the FulcrumSaaS ecosystem in DigitalOcean manually on the terminal.

 **Introduction** 


* Neo4j - is an open-source, NoSQL, native  _graph database_  that provides an ACID-compliant transactional backend for your applications.


* Neo4j Enterprise Version: 4.2



 **Configuration** 

Step 1: Add the following settings to  _neo4j.conf_  in order to enable the Prometheus endpoint.


```
#********************************************************************
# Other Neo4j system properties
#********************************************************************#
# Enable the Prometheus endpoint. Default is 'false'.
metrics.prometheus.enabled=true

# The IP (of neo4j install server) and port the endpoint will bind to in the format <hostname(stg-neo-public-ip) or IP address>:<port number>.
# The default is localhost:2004.
metrics.prometheus.endpoint=157.245.211.199:2004
```
Step 2: When Neo4j is fully started a Prometheus endpoint will be available in  _prometheus.yml_  add the configured address.


```
- job_name: 'stg_neo_neo4j_exporter'
    digitalocean_sd_configs:
            - bearer_token_file: /var/local/fulcrum/token/ops-v1-mon-01
              port: 2004
    relabel_configs:
            - source_labels: [__meta_digitalocean_tags]
              regex: .*,stg,.*
              action: keep
            - source_labels: [__meta_digitalocean_tags]
              regex: .*,neo,.*
              action: keep
            - source_labels: [__meta_digitalocean_tags]
              regex: .*,neo4j_exporter,.*
              action: keep
            - source_labels: [__meta_digitalocean_public_ipv4]
              target_label: __address__
              replacement: '$1:2004'
            - source_labels: [__meta_digitalocean_droplet_name]
              target_label: alias
```


Step 3: Start and Check the Status of Prometheus.


1. service prometheus start


1. service prometheus status





*****

[[category.storage-team]] 
[[category.confluence]] 
