import * as mongo from './mongo';
import { InsertOneWriteOpResult } from 'mongodb';
import { Logger } from './util/logger';

const OWNERS_COLLECTION: string = "owners";
var logger = new Logger("mongoowners");

// Public =====================================================================

var add = async function(fileid: string, instanceguid: string): Promise<void> {
    let collection = await mongo.getCollection(OWNERS_COLLECTION);

    // Check if this entry already exists
    let query = {
        fileid: fileid,
        owner: instanceguid
    };
    let existingDocs: any[] = await collection.find(query).toArray();
    if (existingDocs.length > 0) {
        logger.info(`This entry already exists ${JSON.stringify(query)}`);
        return;
    }

    // Add entry to database
    let doc = {
        fileid: fileid,
        owner: instanceguid
    };
    let insertionResult: InsertOneWriteOpResult = await collection.insertOne(doc);
    logger.info(`Inserted one document to owners: ${JSON.stringify(doc)}`);
}

// Exports ====================================================================

export {
    add
}