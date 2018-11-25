import * as mongo from './mongo'
import * as path from 'path';
import * as stringutil from './util/stringutil';
import * as dateutil from './util/dateutil';
import { InsertOneWriteOpResult } from 'mongodb';
import { Logger } from './util/logger';

const FILES_COLLECTION: string = "files";
var logger = new Logger("mongofiles");

// Create a new file with "uploading" status
// Returns the _id assigned to the new file
var createNewFile = async function(originalFileName: string): Promise<string> {
    let collection = await mongo.getCollection(FILES_COLLECTION);

    // Normalize paths and compute directory and filename
    let filenameInfo = processFilename(originalFileName);

    // Check if there is already an entry present with the same name
    let query = {
        fullPath: filenameInfo.fullPath
    };
    let existingDocs: any[] = await collection.find(query).toArray();
    if (existingDocs.length > 0) {
        throw new Error(`There is already a file named [${filenameInfo.fullPath}]`);
    }

    // Insert new document
    let doc = {
        fullPath: filenameInfo.fullPath,
        directory: filenameInfo.directory,
        basename: filenameInfo.basename,
        status: "uploading",
        updated: dateutil.nowAsMillis()
    };
    var insertResult: InsertOneWriteOpResult = await collection.insertOne(doc);
    logger.info(`Creating new file [${filenameInfo.fullPath}], inserted [${insertResult.insertedCount}]`);
    return insertResult.insertedId.toString();
}

// private ====================================================================

var processFilename = function(filename: string): {
    fullPath: string,
    directory: string,
    basename: string
} {
    // Make directories start with /
    // to prevent navigating outside of the root directory
    var p = "/" + filename;
    p = path.normalize(p);

    var directory = path.dirname(p);
    var basename = path.basename(p);
    if (stringutil.stringNullOrWhitespace(basename)) {
        throw new Error(`Filename [${filename}] cannot be empty`);
    }

    return {
        fullPath: p,
        directory: directory,
        basename: basename
    };
}

// Exports ====================================================================

export {
    createNewFile
}