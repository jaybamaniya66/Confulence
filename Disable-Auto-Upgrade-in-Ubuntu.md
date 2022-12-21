Reference : [https://linuxnightly.com/how-to-disable-automatic-updates-in-ubuntu/](https://linuxnightly.com/how-to-disable-automatic-updates-in-ubuntu/)



Perform the following steps to disable the auto upgrade :
```
apt purge --auto-remove unattended-upgrades -y
systemctl stop apt-daily-upgrade.timer apt-daily-upgrade.service apt-daily.timer apt-daily.service
systemctl disable apt-daily-upgrade.timer apt-daily.timer
systemctl mask apt-daily-upgrade.service apt-daily.service
systemctl daemon-reload


# all above commands are piped together below for use in Ansible
apt purge --auto-remove unattended-upgrades -y && systemctl stop apt-daily-upgrade.timer && systemctl stop apt-daily-upgrade.service && systemctl disable apt-daily-upgrade.timer && systemctl mask apt-daily-upgrade.service && systemctl stop apt-daily.timer && systemctl stop apt-daily.service && systemctl disable apt-daily.timer && systemctl mask apt-daily.service && systemctl daemon-reload

```


Notes :
1. Running step#1 above will remove all configuration. You won’t see the files listed below after performing the step#1 above


```
cat /etc/apt/apt.conf.d/20auto-upgrades
```




Run the following commands to whenever you want to update and upgrade your system
```
apt update
apt upgrade
```


Perform the following steps to rollback the steps performed above and re-enable automatic update/upgrade
```
apt install unattended-upgrades
systemctl enable apt-daily-upgrade.timer apt-daily.timer
systemctl unmask apt-daily-upgrade.service apt-daily.service
```
reboot without restart: 


```
sysctl -p
```


TBD : How to check when the system was last updated/upgraded?
```

```


*****

[[category.storage-team]] 
[[category.confluence]] 
