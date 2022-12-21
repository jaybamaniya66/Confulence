Note: “In the monitor server, we are updating certificate for grafana”

Step 1: Go to the following path  and check whether the certificate is there or not  


```
/var/local/fulcrum/ssl/STAR_fulcrumsaas_net.crt

/var/local/fulcrum/ssl/private.key
```


Step 2 : Change both the certificates with new one which is provided.

Step 3: Check the following path whether the path given in the [grafana.in](http://grafana.in) is correct or not 


```
nano /etc/grafana/grafana.ini
```
Step 4: Restart the grafana server


```
service grafana-server restart
```




*****

[[category.storage-team]] 
[[category.confluence]] 
