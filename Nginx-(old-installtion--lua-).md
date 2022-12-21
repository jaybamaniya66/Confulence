 **Scope** 

This page gives information and installation of the Nginx environment within the FulcrumSaaS ecosystem in DigitalOcean (Stage Web Droplet) as manually on the terminal.

 **Introduction** 


* Nginx-  is a web server that can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache.



 **Installation** 

Step 1: Install lua library


```
apt-get install libnginx-mod-http-lua   
```
Step 2: Download zip file of Nginx-lua-prometheus for GitHub

[https://github.com/knyar/nginx-lua-prometheus](https://github.com/knyar/nginx-lua-prometheus)


```
wget https://github.com/knyar/nginx-lua-prometheus/archive/master.zip
```
Step 3: unzip the above zip file in /var/local/fulcrum folder

            Copy that folder PATH/ and make a change in lua_package_path line

Step 4: Update /etc.nginx/nginx.conf file with in http this code and put  Correct PATH in it.


```
   lua_shared_dict prometheus_metrics 10M;
   lua_package_path "/var/local/fulcrum/nginx-lua-prometheus-master/?.lua;;";
    init_worker_by_lua_block {
    prometheus = require("prometheus").init("prometheus_metrics")
        metric_requests = prometheus:counter(
            "nginx_http_requests_total", "Number of HTTP requests", {"host", "status"})

        metric_latency = prometheus:histogram(
            "nginx_http_request_duration_seconds", "HTTP request latency", {"host"})

        metric_connections = prometheus:gauge(
            "nginx_http_connections", "Number of HTTP connections", {"state"})
    }

    log_by_lua_block {
        metric_requests:inc(1, {ngx.var.server_name, ngx.var.status})
        metric_latency:observe(tonumber(ngx.var.request_time), {ngx.var.server_name})
    }
```
 Step 5: Create a file for server (Nginx-prometheus) in /etc/nginx/sites-enable folder


```
server {
  listen 9145;
  allow 192.168.0.0/16;
  #deny all;
  location /metrics {
    content_by_lua_block {
      metric_connections:set(ngx.var.connections_reading, {"reading"})
      metric_connections:set(ngx.var.connections_waiting, {"waiting"})
      metric_connections:set(ngx.var.connections_writing, {"writing"})
      prometheus:collect()
    }
  }
}
```
Step Optional: Check with-http_stub_status_module is enable or not

            nginx -V 2>&1 | grep -o with-http_stub_status_module

Step 6:Restart and check status and Port(9145) is listen

            service nginx restart

            service nginx status

netstat -tunlp

Step 7: Check the metrics using curl

            curl localhost:9145/metrics

            curl public-ip:9145/metrics







*****

[[category.storage-team]] 
[[category.confluence]] 
