 **Scope** 

This page gives information and installation of the Grafana environment within the FulcrumSaaS ecosystem in DigitalOcean as a Userdata and manually on the terminal.

 **Introduction** 


* Grafana -  an open-source visualization software, which helps the users to understand complex data with the help of data metrics.


* Grafana Version: 7.3.6



 **Installation** 


1.  _Installation while creating Droplets_ 


    1. Selecting a Distribution image (Ubuntu 20)


    1. Choose a Plan (2 vCPU, 4GB Memory)


    1. Select Region


    1. Select Additional Options Have UserData which enter as Text, as File.


    1. Add as Text and copy Content From Github Shell Script file [Install Grafana](https://github.com/upvision-in/devops-assets/blob/master/scripts/shell/install/install_grafana_prometheus.sh).



    
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


    1. service grafana status



    

 **Certification and Google Domain** 

Step 1: log in to upvision Gmail account → search for google domain → My Domain → manage [fulcrumsaas.net](http://fulcrumsaas.net) → Then go to DNS → Scroll down to custom resource records, find for ops-v1-grf then edit to monitor-02 public ip - 161.35.227.11

Step 2.0: Create folder named “ssl" in /var/local/fulcrum for stores key and HTTPS cert_file.

Step 2.1: Create two certificate file names “ops-v1-grf.crt, ops-v1-grf.key", put certificates and key into it, which we are provided by \*[fulcrumsaas.net](http://fulcrumsaas.net).

Step 3:  Make this much Changes in Grafana.ini File, which is in Folder "/etc/grafana/".

Step 4: Find Server Section in grafana.ini file for make Change in Protocol to HTTPS and http_port to 443, Change Domain = [ops-v1-grf.fulcrumsaas.net](http://ops-v1-grf.fulcrumsaas.net).


```
[server]
# Protocol (http, https, h2, socket)
protocol = https

# The http port  to use
http_port = 443

# The public facing domain name used to access grafana from a browser
domain = ops-v1-grf.fulcrumsaas.net
```
Step 4: Finally set the HTTPS Certificate and Key File Path.


```
# https certs & key file
cert_file = /var/local/fulcrum/ssl/ops-v1-grf.crt
cert_key = /var/local/fulcrum/ssl/ops-v1-grf.key
```
Step 5: Note: The port to bind defaults to 3000. To use port 80 you need to either give the Grafana binary permission for example: (On Terminal)


* $ sudo setcap 'cap_net_bind_service=+ep' /usr/sbin/grafana-server



Step 6: For adding SSL cert in BlackBox exporter



SSL comes with .different types from providers. For example: Our latest SSL for grafana is from  **_Sectigo RSA Domain Validation Secure Server CA _** 

So all the local and plugins software don’t have root CA Bundle of Cert and all the browsers have root CA in-build so it worked on them.



Need to do completed on grafana and BlackBox exporter.

Find  **My_CA_Bundle.ca_Bundle**  and add your Star_fulcrumsaas.crt into it. 

Then Place that whole My_CA_Bundle as  **Star_fulcrumsaas.crt** 

 **Restart grafana**  for having into BlackBox exporter.





*****

[[category.storage-team]] 
[[category.confluence]] 
