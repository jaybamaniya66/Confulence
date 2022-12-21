Neo4j Commands:


```
-- Neo4j Services: 
service neo4j status
service neo4j restart
service neo4j stop

-- Logs (Current Logs): 
tail -f /var/log/neo4j/debug.log
tail -f /var/log/neo4j/query.log

-- grep certain logs at particular time using grep (Note: * is used for all the logs to be searched)
cat -n 100 /var/log/neo4j/debug.log* | grep "2022-08-15 10:55:06"
cat -n 100 /var/log/neo4j/query.log* | grep "2022-08-15 10:55:06"

-- Locations majorly used: 
cd /var/lib/neo4j/Certificate
cd /var/lib/neo4j/Plugins (Apoc library) 
cat /etc/neo4j/neo4j.conf
-- For Changing the ownership for the folder (-R is used)
chown -R neo4j:adm /var/lib/neo4j/certificates/
 
-- Ports
netstat -tunlp

```


Web Commands:


```
-- Nginx
sudo systemctl stop nginx
sudo systemctl start nginx
sudo systemctl restart nginx
sudo systemctl reload nginx
sudo systemctl disable nginx
sudo systemctl enable nginx

-- Logs for Nginx
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

-- Location for commonly used file for Nginx
sudo nano /etc/nginx/sites-available/your_domain
nano /var/www/your_domain/html/index.html

-- Logs PM2
pm2 logs 
pm2 init

For Pm2 logs flush:
pm2 flush hypatia 
pm2 flush hypatia-out-*
pm2 flush hypatia-error-* 
remove other old log files

Black-Blox exporter 
systemctl status blackbox_exporter
systemctl restart blackbox_exporter

To kill process:
kill -9 "process id"
kill -1  "process id" (to restart)

Script: (backup)
/var/local/fulcrum/scripts/db-backup.sh

crontab: (sudo su neo4j --> use neo4j as user)
crontab -l (for cronjobs)
crontab -e (to edit the jobs)

```
ELK Commands


```
ElasticSearch:
/usr/share/elasticsearch/bin/elasticsearch --version
curl -k --user elastic:OBDrDTkH7fGoDnl1VLcK https://161.35.186.145:9200/_cluster/health
https://161.35.186.145:9200/_cat/nodes

sudo systemctl daemon-reload
sudo systemctl enable elasticsearch.service
sudo systemctl start elasticsearch.service
sudo systemctl stop elasticsearch.service
sudo systemctl status elasticsearch.service
tail -n 100 /var/log/elasticsearch/sysops-elk.log

Kibana:
sudo /bin/systemctl daemon-reload
sudo /bin/systemctl enable kibana.service
sudo systemctl start kibana.service
sudo systemctl stop kibana.service
sudo systemctl status kibana.service

For Kibana port:
http://143.198.25.176:5601/

Logstash: (Note: Stop the service before running this command).
/usr/share/logstash/bin/logstash -e 'input { stdin { } } output { stdout {} }'

sudo systemctl start logstash.service
sudo systemctl stop logstash.service
sudo systemctl status logstash.service
sudo tail -f /var/log/logstash/logstash.log

Filebeat:
sudo service filebeat start
sudo service filebeat status
sudo service filebeat restart
sudo service filebeat stop

journalctl -u filebeat.service
```




*****

[[category.storage-team]] 
[[category.confluence]] 
