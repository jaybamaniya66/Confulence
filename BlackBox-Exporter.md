-> BlackBox Exporter is the Prometheus exporter which used to get data like response code, status, ssl etc for any website.



-> Prometheus added as official exporter in it’s exporter list. [https://prometheus.io/docs/instrumenting/exporters](https://prometheus.io/docs/instrumenting/exporters/).



 **Prerequisites :-** 


* Make sure Prometheus is installed - [[Prometheus Installation|Prometheus-Installation]]


* Make sure Grafana is installed - [[Grafana Installation|Grafana-Installation]]





 **Installation :-** 

Login to node (Instance) and change your user as root.


* First create the blackbox exporter user:


```
$ useradd --no-create-home --shell /bin/false blackbox_exporter
```



* Download blackbox exporter and extract:

    Check the latest version from here [https://github.com/prometheus/blackbox_exporter/releases](https://github.com/prometheus/blackbox_exporter/releases) and copy the url of  **linux-amd64.tar.gz** 


```
$ wget https://github.com/prometheus/blackbox_exporter/releases/download/v0.18.0/blackbox_exporter-0.18.0.linux-amd64.tar.gz
$ tar -xvf blackbox_exporter-0.18.0.linux-amd64.tar.gz
```



* Move the binaries in place and change the ownership:


```
$ mv blackbox_exporter-0.18.0.linux-amd64/blackbox_exporter /usr/local/bin/blackbox_exporter
$ chown blackbox_exporter:blackbox_exporter /usr/local/bin/blackbox_exporter
```



* Remove the downloaded archive:

    


```
rm -rf blackbox_exporter-0.18.0.linux-amd64.tar.gz
```



* Create the blackbox directory and create the config:

    


```
$ mkdir /etc/blackbox_exporter
$ vi /etc/blackbox_exporter/blackbox.yml
```



* Populate this config in that file blackbox.yml:

    


```
modules:
  http_2xx:
    prober: http
    timeout: 5s
    http:
      method: GET
  http_fulcrumsaas_ca:
    prober: http
    timeout: 5s
    http:
      method: GET
      tls_config:
        ca_file: "/var/local/fulcrum/ssl/fulcrumsaas-com-chain.pem"
  http_neo4j:
    prober: http
    timeout: 5s
    http:
      method: GET
      tls_config:
        ca_file: "/var/local/fulcrum/ssl/STAR_FULCRUMSAAS_2023.crt"      
```



* Update the permissions of the config so that the user has ownership:

    


```
$ chown blackbox_exporter:blackbox_exporter /etc/blackbox_exporter/blackbox.yml
```



* Create the systemd unit file:

    


```
vi /etc/systemd/system/blackbox_exporter.service
```



* Populate the systemd unit file configuration:

    


```
[Unit]
Description=Blackbox Exporter
Wants=network-online.target
After=network-online.target

[Service]
User=blackbox_exporter
Group=blackbox_exporter
Type=simple
ExecStart=/usr/local/bin/blackbox_exporter --config.file /etc/blackbox_exporter/blackbox.yml

[Install]
WantedBy=multi-user.target
```



* Reload the systemd daemon and restart the service:

    


```
$ systemctl daemon-reload
$ systemctl start blackbox_exporter
```



* The service should be started, verify:

    


```
$ systemctl status blackbox_exporter
  blackbox_exporter.service - Blackbox Exporter
   Loaded: loaded (/etc/systemd/system/blackbox_exporter.service; disabled; vendor preset: enabled)
   Active: active (running) since Wed 2019-05-08 00:02:40 UTC; 5s ago
 Main PID: 10084 (blackbox_export)
    Tasks: 6 (limit: 4704)
   CGroup: /system.slice/blackbox_exporter.service
           └─10084 /usr/local/bin/blackbox_exporter --config.file /etc/blackbox_exporter/blackbox.yml

May 08 00:02:40 ip-172-31-41-126 systemd[1]: Started Blackbox Exporter.
May 08 00:02:40 ip-172-31-41-126 blackbox_exporter[10084]: level=info ts=2019-05-08T00:02:40.5229204Z caller=main.go:213 msg="Starting blackbox_exporter" version="(version=0.14.0, branch=HEAD, revision=bb
May 08 00:02:40 ip-172-31-41-126 blackbox_exporter[10084]: level=info ts=2019-05-08T00:02:40.52553523Z caller=main.go:226 msg="Loaded config file"
May 08 00:02:40 ip-172-31-41-126 blackbox_exporter[10084]: level=info ts=2019-05-08T00:02:40.525695324Z caller=main.go:330 msg="Listening on address" address=:9115
```



* Enable the service on boot:

    


```
$ systemctl enable blackbox_exporter
```



* Configure Prometheus:

    -> Next, we need to provide context to prometheus on what to monitor. We will inform prometheus to monitor a web endpoint on port 8080 using the blackbox exporter (we will create a python simplehttpserver to run on port 8080).

Edit the prometheus config /etc/prometheus/prometheus.yml and append the following:

    


```
  - job_name: 'blackbox'
    metrics_path: /probe
    params:
      module: [http_2xx]
    static_configs:
      - targets:
        - https://api-v1-web.fulcrumsaas.net
        - https://cal-v1-web.fulcrumsaas.net
        - https://cor-v1-eng.fulcrumsaas.net
        - https://log-v1-web.fulcrumsaas.net
        - https://portal.fulcrumsaas.net
        - https://stg-portal.fulcrumsaas.net
        - https://stg-cor-v1-eng.fulcrumsaas.net
        - https://stg-api-v1-web.fulcrumsaas.net
        - https://stg-log-v1-web.fulcrumsaas.net
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: localhost:9115
  - job_name: 'blackbox_ssl_ca'
    metrics_path: /probe
    params:
      module: [http_fulcrumsaas_ca]
    static_configs:
      - targets:
        - https://fulcrumsaas.com
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: localhost:9115
  - job_name: 'blackbox_neo4j'
    metrics_path: /probe
    params:
      module: [http_neo4j]
    static_configs:
      - targets:
        - https://hyp-neo-v2-02.fulcrumsaas.net:7473/browser/
        - https://log-v2-neo.fulcrumsaas.net:7473/browser/
        - https://stg-v2-neo.fulcrumsaas.net:7473/browser/
        - https://prt-v1-neo.fulcrumsaas.net:7473/browser/
        - https://hyp-v2-neo.fulcrumsaas.net:7473/browser/
        - https://hyp-neo-v3-s01.fulcrumsaas.net:7473/browser/
        - https://log-neo-v3-s01-01.fulcrumsaas.net:7473/browser/
        
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: localhost:9115
```



* Restart prometheus:

    


```
systemctl restart prometheus
```




 **Blackbox Exporter Dashboard:** 



To install a blackbox exporter dashboard: [https://grafana.com/dashboards/7587](https://grafana.com/dashboards/7587), create a new dashboard, select import, provide the ID: 7587, select the prometheus datasource and select save.



Another one is 9115

9115 - black box contains pie chart that we need to install and restart the grafana server.


```
grafana-cli plugins install grafana-piechart-panel
```
 **For Installing raintank-worldping-app grafana plugin run below command from node:** 


```
grafana-cli plugins install raintank-worldping-app
```
After installing this plugin it will be available in Grafana Plugin list. 



References:



1. [https://blog.ruanbekker.com/blog/2019/05/17/install-blackbox-exporter-to-monitor-websites-with-prometheus](https://blog.ruanbekker.com/blog/2019/05/17/install-blackbox-exporter-to-monitor-websites-with-prometheus/)



2. [https://grafana.com/grafana/plugins/grafana-piechart-panel](https://grafana.com/grafana/plugins/grafana-piechart-panel/)



3. [https://geekflare.com/monitor-website-with-blackbox-prometheus-grafana](https://geekflare.com/monitor-website-with-blackbox-prometheus-grafana/)



4. [https://grafana.com/grafana/dashboards/13587](https://grafana.com/grafana/dashboards/13587)



*****

[[category.storage-team]] 
[[category.confluence]] 
