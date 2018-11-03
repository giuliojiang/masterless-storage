# Masterless design

No master-slave instances configuration, every instance works in the exact same way, and synchronization is achieved via 
a shared MongoDB database in which all metadata is stored.

# Database content

## Instances table

* instanceid - it's a guid
* timestamp

Contains the registered instances. Each instance has its own identifying name (arbitrarily set by the instance creation).

Each instance also has a timestamp for the last heartbeat update.

An instance sends a heartbeat every 1 minute.

Instances that have not been updated for more than 7 days are removed, including all their references in other tables.

## Files table

Each file has: 
* original filename, including extension
* _id string, also used to determine the name of the file when stored in each instance
* present. A boolean flag. True means the file is normal, False means that the file has been deleted.
* ready. Ready = false means that the file is being uploaded
* updated. Timestamp. Useful for instances to check for most recent changes. Also used to wipe files that failed to upload (ready = false and timestamp too old)

Files cannot be modified. Which means that if the user wants to modify a file, he needs to delete the old one and create
a new one. This is important to make sure that all references are consistent.

## Owners table

* fileid
* owner

This table determines which files each instance has. It is used by instances to find which files are not present in the
local copy of the fileset. This check is performed every 1 hour. Each file that is not present in the local fileset is
downloaded from instances that have it.

This table is regularly cleaned up every 7 days to prune dead instance references. The pruning is performed and scheduled
by every instance, so there are effectively several prunes per week.

# On boot

No local cache wipe on boot to avoid data loss in case there is a major outage with all nodes going down.

# On file request

When a node receives a download request for a file, it first checks in the database. If it doesn't exist or is deleted,
nothing is done.

If the file is valid, then:
* the local copy has the file. Simply send it to the client
* the local copy doesn't have the file. Lookup in the owners table an instance that has it, and try to download it to the local copy,
while also streaming it to the client. This requires stream splitting in NodeJS. After the local copy has been downloaded,
update the Owners table.

If the file is not valid, then:
* try to delete any existing local file
* try to remove any existing entry in the owners table

# On file delete request (authenticated)

* Update files table
* Update owners table for this node
* Delete local file

# On file upload request (authenticated)

* Create new entry in files table. Ready = false
* Rename the received file on disk
* Add entry in file owners table
* Set Ready = true