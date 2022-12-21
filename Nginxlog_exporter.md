 **Scope** 

This page gives information and installation of the Nginx environment within the FulcrumSaaS ecosystem in DigitalOcean (Stage Web Droplet) as manually on the terminal.

 **Introduction** 


* Nginx-  is a web server that can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache.



 **Installation** 

Step 1: Install nginxlog tar file. from [https://github.com/martin-helmich/prometheus-nginxlog-exporter/releases/tag/v1.8.0](https://github.com/martin-helmich/prometheus-nginxlog-exporter/releases/tag/v1.8.0).


```
$wget https://github.com/martin-helmich/prometheus-nginxlog-exporter/releases/download/v1.8.0/prometheus-nginxlog-exporter_1.8.0_linux_amd64.tar.gz
```

```
$tar -xzf prometheus-nginxlog-exporter_1.8.0_linux_amd64.tar.gz
```
Step 2: $nano /etc/systemd/system/prometheus-nginxlog-exporter.service

 (create the above the file prometheus-nginxog-exporter.service in the given path)


```
[Unit]
Description=NGINX metrics exporter for Prometheus
After=network-online.target
[Service]
User=nginx
ExecStart=/usr/local/bin/prometheus-nginxlog-exporter -config-file /etc/prometheus-nginxlog-exporter/prometheus-nginxlog-exporter.hcl
Restart=always
ProtectSystem=full
CapabilityBoundingSet=
[Install]
WantedBy=multi-user.target
```


Step 3: $ nano /etc/prometheus-nginxlog-exporter/prometheus-nginxlog-exporter.hcl


```
listen {
  port = 4040
}
namespace "nginx" {
  source = {
    files = [
      "/var/log/nginx/access.log"
    ]
  }
  format = "'$remote_addr - $remote_user [$time_local] "$request" $status $body_bytes_sent "$http_referer" "$http_user_agent" rt=$request_time uct="$upstream_connect_time" uht="$upstream_header_time" urt="$upstream_response_time" $server_addr $connection_requests"
  labels {
    app = "default"
  }
}
```


Step 4: Check for log_format in /etc/nginx/nginx.conf file its same as above HCL file. Then enable/start nginxlog.service


```
$systemctl enable prometheus-nginxlog-exporter.service
```

```
$service prometheus-nginxlog-exporter start
```

```
$service prometheus-nginxlog-exporter status
```


Step 5: Restart nginx Service.


```
service nginx restart
```


Step 6: try to curl localhost at 4040 port.


```
curl localhost:4040/metrics
```


*****

[[category.storage-team]] 
[[category.confluence]] 
