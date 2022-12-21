 **Scope** 

This page gives information and installation of the Prometheus environment within the FulcrumSaaS ecosystem in DigitalOcean as a Userdata and manually on the terminal.

 **Introduction** 


* Prometheus -  an open-source monitoring software application used for event monitoring and alerting. It records real-time metrics in a time series database (allowing for high dimensionality) built using an HTTP pull model, with flexible queries and real-time alerting.


* Prometheus Version: 2.23.0



 **Installation** 


1.  _Installation while creating Droplets_ 


    1. Selecting a Distribution image (Ubuntu 20)


    1. Choose a Plan (2 vCPU, 4GB Memory)


    1. Select Region


    1. Select Additional Options Have UserData which enter as Text, as File.


    1. Add as Text and copy Content From Github file [Install Prometheus](https://github.com/upvision-in/devops-assets/blob/master/scripts/shell/install/install_grafana_prometheus.sh).



    
    1. Add Authentication and Add Tags and Create Droplet.



    
1.  _Installation using ssh into Droplets on terminal manually_ 


    1. Make sure to run this shell script file in your root user for work manually.


    1. sudo su



    
    1. Create a shell script file using touch or any editor(nano, vim) and copy all content into it.


    1. touch install_grafana_prometheus.sh / nano



    
    1. Give script permissions to allow executable.


    1. chmod 744 install_grafana_prometheus.sh



    
    1.  For Running shell script:


    1. ./install_grafana_prometheus.sh



    

    
1. Check service install status


    1. service prometheus status



    

 **Configure Prometheus.yml** 


1. Global Config in Prometheus for scrape interval


```
global:
  scrape_interval:     15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
```

1. Alert manager


```
alerting:
  alertmanagers:
  - static_configs:
    - targets:
      # - alertmanager:9093
```

1. Scrape Node Exporter (Prometheus itself) Droplet in FulcrumSysops


```
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: 'prometheus'
    static_configs:
    - targets: ['localhost:9090']] ]></ac:plain-text-body></ac:structured-macro></li><li><p>Scrape Node Exporter (stg-v1-neo) Droplet in FulcrumStage</p><ac:structured-macro ac:name="code" ac:schema-version="1" ac:macro-id="8f1c48cd-e800-4127-ad94-813694b42485"><ac:plain-text-body><![CDATA[- job_name: 'stg_neo_node_exporter'
    digitalocean_sd_configs:
            - bearer_token_file: /var/local/fulcrum/token/ops-v1-mon-01
              port: 9100
    relabel_configs:
            - source_labels: [__meta_digitalocean_tags]
              regex: .*,stg,.*
              action: keep
            - source_labels: [__meta_digitalocean_tags]
              regex: .*,neo,.*
              action: keep
            - source_labels: [__meta_digitalocean_tags]
              regex: .*,node_exporter,.*
              action: keep
            - source_labels: [__meta_digitalocean_public_ipv4]
              target_label: __address__
              replacement: '$1:9100'
            - source_labels: [__meta_digitalocean_droplet_name]
              target_label: alias
```

1. Scrape Node Exporter (stg-v1-web) Droplet in FulcrumStage


```
  - job_name: 'stg_web_node_exporter'
    digitalocean_sd_configs:
            - bearer_token_file: /var/local/fulcrum/token/ops-v1-mon-01
              port: 9100
    relabel_configs:
            - source_labels: [__meta_digitalocean_tags]
              regex: .*,stg,.*
              action: keep
            - source_labels: [__meta_digitalocean_tags]
              regex: .*,web,.*
              action: keep
            - source_labels: [__meta_digitalocean_tags]
              regex: .*,node_exporter,.*
              action: keep
            - source_labels: [__meta_digitalocean_public_ipv4]
              target_label: __address__
              replacement: '$1:9100'
            - source_labels: [__meta_digitalocean_droplet_name]
              target_label: alias
```






*****

[[category.storage-team]] 
[[category.confluence]] 
