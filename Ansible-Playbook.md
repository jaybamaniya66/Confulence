For making a playbook , you have to make yml file, for EG: playbook1.yml. (Note: hosts can be given as per your requierement )

Playbook Examples: below are the examples of the playbook: 

To run a playbook : ansible-playbook -i fulcrumsaas_inventory “Playbook-01.yml” -u root (note: fulcrum_inventory contains all the host name)

Playbook-01.yml (simple example whether your playbook is running or not)


```
---

- hosts: sysops-elk-01
  become: yes
  tasks:
    - name: Print message
      debug:
        msg: Hello  
```


The above playbook is for the disabling & removing auto update for ubuntu. Playbook-02.yml


```
 ---
- hosts: sysops-elk-02
 
  tasks:
  - name: remove unattended upgrades
    command: apt purge --auto-remove unattended-upgrades -y
  - name: stop daily upgrade timer 
    command: systemctl stop apt-daily-upgrade.timer apt-daily-upgrade.service apt-daily.timer apt-daily.service
  - name: disable daily upgrade timer
    command: systemctl disable apt-daily-upgrade.timer apt-daily.timer
  - name: mask daily upgrade service
    command: systemctl mask apt-daily-upgrade.service apt-daily.service
  - name: daemon reload
    command: systemctl daemon-reload

```
Playbook hypatia log &  neo4j log (in place of hosts you can give your particular server or group name) 


```
---

- hosts: hyp-v2-neo-04

  tasks:
    - name: install filebeat 
      command: curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-8.1.2-amd64.deb
    - name: install debian packages
      command: sudo dpkg -i filebeat-8.1.2-amd64.deb
    - name: replace filebeat yml file from local to remote location with given config
      copy: 
        src: ~/ansible-practise/filebeat.yml  
        dest: /etc/filebeat/filebeat.yml
    - name: start filebeat service    
      command: sudo service filebeat start
    - name: check the status 
      command: sudo service filebeat status

```
Playbook for removing old pm2 logs and flush logs for the same and after installation of filebeat: 


```
---

- hosts: prt-v2-web-03

  tasks:
    - name: copy the log in tmp file as backup
      shell: cp -R /root/.pm2/logs/* /root/logs-backup-01-20220513/
    - name: remove all the logs from pm2
      shell: rm -rf /root/.pm2/logs/*
    - name: flush logs
      shell: pm2 flush hypatia
    - name: install filebeat 
      shell: curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-8.1.2-amd64.deb
    - name: install debian packages
      shell: sudo dpkg -i filebeat-8.1.2-amd64.deb
    - name: replace filebeat yml file from local to remote location with given config
      copy: 
        src: ~/ansible-practise/filebeat.yml  
        dest: /etc/filebeat/filebeat.yml
    - name: start filebeat service    
      shell: sudo service filebeat start
    - name: check the status 
      shell: sudo service filebeat status

```


*****

[[category.storage-team]] 
[[category.confluence]] 
