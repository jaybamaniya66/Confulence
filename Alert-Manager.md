
## Prometheus Alerting Configuration with AlertManager 


 **Step 1:**  We need to download the latest binary of AlertManager from [here](https://prometheus.io/download/#alertmanager). and Move the alert manager binary file into the bin file.


```
cd /tmp
wget https://github.com/prometheus/alertmanager/releases/download/v0.23.0/alertmanager-0.23.0.linux-amd64.tar.gz
tar -xzf alertmanager-0.23.0.linux-amd64.tar.gz

mv alertmanager-0.23.0.linux-amd64/alertmanager /usr/local/bin/
chown root:root /usr/local/bin/alertmanager
```


 **Step 2:**  AlertManager configuration and create our alertmanager.yml in the newly created alert manager folder in /etc folder.


```
mkdir /etc/alertmanager/
nano /etc/alertmanager/alertmanager.yml
```

* cat /etc/alertmanager/alertmanager.yml Output shown below.


* 
```
global:
  resolve_timeout: 1m
  slack_api_url: 'https://hooks.slack.com/services/xyz'

route:
  receiver: 'Upvision-slack-notifications'

receivers:
- name: 'Upvision-slack-notifications'
  slack_configs:
  - channel: '#fulcrumsaas'
    send_resolved: true
```




 **Step 3:**  Add/create an alert rule file and put it into the /etc/prometheus/ folder.


* 
```
groups:
- name: alert_rules
  rules:
  - alert: InstanceDown
    # Condition for alerting
    expr: up{job=~".*_node_exporter"} == 0
    for: 1m
    # Annotation - additional informational labels to store more information
    annotations:
      title: 'Instance {{ $labels.instance }} down'
      description: '{{ $labels.instance }} of job {{ $labels.job }} has been down for more than 1 minute.'
    # Labels - additional labels to be attached to the alert
    labels:
      severity: 'critical'
```




 **Step 4** : Now, We have to create the AlertManager systemd service file.


```
nano /etc/systemd/system/alertmanager.service 
```

* 


* cat /etc/systemd/system/alertmanager.service Output shown below.


* 
```
[Unit]
Description=AlertManager Server Service
Wants=network-online.target
After=network-online.target

[Service]
User=root
Group=root
Type=simple
ExecStart=/usr/local/bin/alertmanager --config.file /etc/alertmanager/alertmanager.yml


[Install]
WantedBy=multi-user.target
```

* 


* Then reload the daemon and start the alert manager service:




```
systemctl daemon-reload
systemctl start alertmanager
systemctl status alertmanager
systemctl enable alertmanager
```


 **Step 5:** Now we need to configure the Prometheus server so it can talk to the Alert Manager service.


* /etc/prometheus/prometheus.yml


* 
```
# Alertmanager configuration
alerting:
  alertmanagers:
  - static_configs:
    - targets:
      - 'alertmanagersip:9093'

# Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
rule_files:
  - "alert_rules.yml"
  # - "second_rules.yml"
```

* Check if the prometheus config is valid or not: 


```
./usr/local/bin/promtool check config /etc/prometheus/prometheus.yml
```

* Restart the Prometheus process for the pickup of the changes.


* 
```
ps -ef | grep "prometheus"
kill -HUP "PIDofprometheus" (Note: -HUP and -1 server the same thing to kill process)
kill -1 'PIDofprometheus'
systemctl status prometheus
```




 **Step 6:** Verify on Prometheus endpoints.



 **Reference :** 

[https://prometheus.io/docs/alerting/latest/alertmanager/](https://prometheus.io/docs/alerting/latest/alertmanager/)

[https://prometheus.io/docs/alerting/latest/configuration/](https://prometheus.io/docs/alerting/latest/configuration/)

[https://juliusv.com/promslack/](https://juliusv.com/promslack/)

[https://github.com/prometheus/alertmanager](https://github.com/prometheus/alertmanager)



*****

[[category.storage-team]] 
[[category.confluence]] 
