Installation
```
sudo apt install ansible
ansible-doc -t inventory -l
```


Basic Setup -  _ansible-config_ [Configuration File](https://docs.ansible.com/ansible/latest/reference_appendices/config.html#the-configuration-file)
```
cat /etc/ansible/ansible.cfg

        [defaults]
        inventory = /etc/ansible/fulcrumsaas_inventory
        
ansible-config -v view  # shows the above output
ansible-config -v list
```


DigitalOcean Specific - How to create an inventory
```
wget https://github.com/do-community/do-ansible-inventory/releases/download/v2.0.0/do-ansible-inventory_2.0.0_linux_x86_64.tar.gz
tar –xvzf do-ansible-inventory_2.0.0_linux_x86_64.tar.gz
rm do-ansible-inventory_2.0.0_linux_x86_64.tar.gz 

# move do-ansible-inventory file to /usr/local/bin

/usr/local/bin/do-ansible-inventory --access-token dd06f7d4de1b8cd4546596d619d8528be51a2c0de0466372cae9358d650efb16 --out /etc/ansible/fulcrumsaas_inventory

ansible-inventory --list -y -v -i fulcrumsaas_inventory

ansible-inventory -y -v -i fulcrumsaas_inventory --graph
ansible-inventory -y -v -i fulcrumsaas_inventory --graph --vars

# add fulcrum private key to the keystore as we do not know how to pass the key for ansible to use...
sudo chmod 400 .ssh/fulcrum-do-20201214
ssh-add .ssh/fulcrum-do-20201214
```


Example Adhoc Commands     [Common Patterns](https://docs.ansible.com/ansible/latest/user_guide/intro_patterns.html#common-patterns)
```
# to run command using root user on all hosts
ansible all -a "hostname" -u root

# to run command against a particular group
ansible FulcrumSysOps -a "df -h" -u root
```


Example Adhoc Commands - to disable automatic updates      [[Disable Auto Upgrade in Ubuntu|Disable-Auto-Upgrade-in-Ubuntu]]
```
# add fulcrum private key to the keystore as we do not know how to pass the key for ansible to use...
sudo chmod 400 .ssh/fulcrum-do-20201214
ssh-add .ssh/fulcrum-do-20201214


ansible FulcrumSysOps -a "apt purge --auto-remove unattended-upgrades -y" -u root
ansible FulcrumSysOps -a "systemctl stop apt-daily-upgrade.timer apt-daily-upgrade.service apt-daily.timer apt-daily.service" -u root
ansible FulcrumSysOps -a "systemctl disable apt-daily-upgrade.timer apt-daily.timer" -u root
ansible FulcrumSysOps -a "systemctl mask apt-daily-upgrade.service apt-daily.service" -u root
ansible FulcrumSysOps -a "systemctl daemon-reload" -u root


ansible all -a "apt purge --auto-remove unattended-upgrades -y" -u root
ansible all -a "systemctl stop apt-daily-upgrade.timer apt-daily-upgrade.service apt-daily.timer apt-daily.service" -u root
ansible all -a "systemctl disable apt-daily-upgrade.timer apt-daily.timer" -u root
ansible all -a "systemctl mask apt-daily-upgrade.service apt-daily.service" -u root
ansible all -a "systemctl daemon-reload" -u root
```




*****

[[category.storage-team]] 
[[category.confluence]] 
