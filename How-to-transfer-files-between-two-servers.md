
1. Start listening for the file on the destination machine:


```
nc -l 3333 | pv > /var/lib/neo4j/data/databases/20220914.tar.gz
```

1. Start sending file from the source machine:




```
nc -w 3 161.35.227.11 3333 < /db-backup-archive/full/hyp-neo-v2-02/euclid/20220914.tar.gz
```
FOR FOLDER TRANSFER:


```
sender:  tar cfp - jay | nc -w 3 157.245.214.93 3333
receiver: nc -l -p 3333 | tar xvfp -
```




*****

[[category.storage-team]] 
[[category.confluence]] 
