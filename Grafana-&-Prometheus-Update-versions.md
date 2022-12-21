Step 1 : Before updating Grafana & Prometheus , Take a snapshort of the sysops-monitor-01 server : 

Step 2: Check the backup for the grafana 

For that you need to check the below path to see whether the backups are been taken or not: 


```
For grafana:
cd /db-backup-archive/full/grafana
```
Step 3: Check out the prometheus data in : 


```
cd /var/lib/prometheus/
```
Step 4 : Check the version for the both : 


```
grafana-cli -v
prometheus --version
```
Step 5: update the version of grafana & prometheus in the following script & run the script after updating the version : [https://github.com/upvision-in/devops-assets/blob/master/scripts/shell/install/install_grafana_prometheus.sh](https://github.com/upvision-in/devops-assets/blob/master/scripts/shell/install/install_grafana_prometheus.sh)


```
for example: 
 GRAFANA_VERSION='8.5.2'
 PROMETHEUS_VERSION='2.35.0'
```
Step 6: check the updated version for the both & also check the dashboard for the same.

Grafana backup script : run  crontab -l

crontab -l script:

#!/bin/bash

main(){

        # This Command will read the date.

        TIME=`date +%Y%m%d`

        printf "$TIME"

        # The filename including the date.

        FILENAME="gdb-backup-$TIME.tar.gz"

        # Source backup folder.

        SRCDIR=/var/lib/grafana

        # Destination of backup file.

        DESDIR=/db-backup-archive/full/grafana

        FILEARC="${DESDIR}/${FILENAME}"

        tar -cpzf "${FILEARC}" "${SRCDIR}"

        find "$DESDIR" -mtime +7 -delete

}

main "$@"



Service file which is used for in the latest version, path : cat /lib/systemd/system/grafana-server.service

\[Unit]

Description=Grafana instance

Documentation=[http://docs.grafana.org](http://docs.grafana.org)

Wants=network-online.target

After=network-online.target

After=postgresql.service mariadb.service mysql.service

\[Service]

EnvironmentFile=/etc/default/grafana-server

User=grafana

Group=grafana

Type=simple

Restart=on-failure

WorkingDirectory=/usr/share/grafana

RuntimeDirectory=grafana

RuntimeDirectoryMode=0750

ExecStart=/usr/sbin/grafana-server                                                  

--config=${CONF_FILE}                                   

--pidfile=${PID_FILE_DIR}/grafana-server.pid            

--packaging=deb                                         

cfg:default.paths.logs=${LOG_DIR}                       

cfg:default.paths.data=${DATA_DIR}                      

cfg:default.paths.plugins=${PLUGINS_DIR}                

cfg:default.paths.provisioning=${PROVISIONING_CFG_DIR}

LimitNOFILE=10000

TimeoutStopSec=20

UMask=0027

\[Install]

WantedBy=multi-user.target

Service file which was not working while updating to its latest version, path : cat /lib/systemd/system/grafana-server.service

\[Unit]

Description=Grafana instance

Documentation=[http://docs.grafana.org](http://docs.grafana.org)

Wants=network-online.target

After=network-online.target

After=postgresql.service mariadb.service mysql.service

\[Service]

EnvironmentFile=/etc/default/grafana-server

User=grafana

Group=grafana

Type=simple

Restart=on-failure

WorkingDirectory=/usr/share/grafana

RuntimeDirectory=grafana

RuntimeDirectoryMode=0750

ExecStart=/usr/sbin/grafana-server                                                  

--config=${CONF_FILE}                                   

--pidfile=${PID_FILE_DIR}/grafana-server.pid            

--packaging=deb                                         

cfg:default.paths.logs=${LOG_DIR}                       

cfg:default.paths.data=${DATA_DIR}                      

cfg:default.paths.plugins=${PLUGINS_DIR}                

cfg:default.paths.provisioning=${PROVISIONING_CFG_DIR}

LimitNOFILE=10000

TimeoutStopSec=20

CapabilityBoundingSet=

DeviceAllow=

LockPersonality=true

MemoryDenyWriteExecute=false

NoNewPrivileges=true

PrivateDevices=true

PrivateTmp=true

ProtectClock=true

ProtectControlGroups=true

ProtectHome=true

ProtectHostname=true

ProtectKernelLogs=true

ProtectKernelModules=true

ProtectKernelTunables=true

ProtectProc=invisible

ProtectSystem=full

RemoveIPC=true

RestrictAddressFamilies=AF_INET AF_INET6 AF_UNIX

RestrictNamespaces=true

RestrictRealtime=true

RestrictSUIDSGID=true

SystemCallArchitectures=native

UMask=0027

\[Install]

WantedBy=multi-user.target



*****

[[category.storage-team]] 
[[category.confluence]] 
