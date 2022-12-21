

 **Scope** 

This page gives information and installation of the Node Exporter environment within the FulcrumStage Droplets (stg-v1-neo and stg-v1-web) in DigitalOcean as a manual on the terminal via SSH into Droplets.

 **Introduction** 


* Node Exporter -  enables you to measure various machine resources such as memory, disk, and CPU utilization.


* Node Exporter Version: 1.0.1



note **Installation** 

 **Installation** 


1.  _Installation using ssh into both Droplets on terminal manually_ 


    1. Make sure to run this shell script file in your root user for work manually in the /tmp folder.


    1. sudo su



    
    1. Create a shell script file using touch or any editor(nano, vim) and copy all content from Github [Install Node Exporter](https://github.com/upvision-in/devops-assets/blob/master/scripts/shell/install/install_node_exporter.sh) into it.


    1. touch install_node_exporter.sh / nano



    
    1. Give script permissions to allow executable.


    1. chmod 744 install_node_exporter.sh



    
    1.  For Running shell script:


    1. ./install_node_exporter.sh



    

    
1. Check service install status


    1. service node_exporter status



    
1. Check Port using


    1. netstat -tunlp



    



 **Steps To Uninstall node_exporter Service** 

Step 1:    service node_exporter status

Step 2:    service node_exporter stop

Step 3:   rm -rf  /usr/local/bin/node_exporter

Step 4:    rm  /etc/systemd/system/node_exporter.service

Step 5:    rm /tmp/install_node_exporter.sh

Step 6:    systemctl daemon-reload







*****

[[category.storage-team]] 
[[category.confluence]] 
