# Masterless design

No master-slave instances configuration, every instance works in the exact same way, and synchronization is achieved via 
a shared MongoDB database in which all metadata is stored.

# Database content

## Instances table

Contains the registered instances. Each instance has its own identifying name (arbitrarily set by the instance creation).

Each instance also has a timestamp for the last heartbeat update.

An instance sends a heartbeat every 1 minute.

Instances that have not been updated for more than 7 days are removed, including all their references in other tables.

## Files table

Each file has: 
* original filename, including extension
* _id string, also used to determine the name of the file when stored in each instance
* present. A boolean flag. True means the file is normal, False means that the file has been recently deleted.
* deletedOn. Timestamp of when the file was deleted. 

When a file is deleted, the present flag is sent to False and deletedOn timestamp is updated. Cleanup jobs clean the files
table from files that have been deleted for more than 7 days.

Files cannot be modified. Which means that if the user wants to modify a file, he needs to delete the old one and create
a new one. This is important to make sure that all references are consistent.

## Owners table

This table determines which files each instance has. It is used by instances to find which files are not present in the
local copy of the fileset. This check is performed every 1 hour. Each file that is not present in the local fileset is
downloaded from instances that have it.

This table is regularly cleaned up every 7 days to prune dead instance references. The pruning is performed and scheduled
by every instance, so there are effectively several prunes per week.

# On boot

If the instance has not been used for more than 3 days, the local cache is wiped and a new instance name is required.
This is to make sure that the local copy of the fileset remains consistent and doesn't contain deleted files.

# On file request

When a node receives a download request for a file, it first checks in the database. If it doesn't exist or is deleted,
nothing is done.

If the file is valid, then:
* the local copy has the file. Simply send it to the client
* the local copy doesn't have the file. Lookup in the owners table an instance that has it, and try to download it to the local copy,
while also streaming it to the client. This requires stream splitting in NodeJS. After the local copy has been downloaded,
update the Owners table.