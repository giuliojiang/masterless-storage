import * as mongo from './mongo';
import { InsertOneWriteOpResult, UpdateWriteOpResult, DeleteWriteOpResultObject } from 'mongodb';
import { Logger } from './util/logger';

const logger = new Logger("mongoinstances");

// <instanceid> new instance id. Should be a GUID string
// <return>     number of inserted documents
var addInstance = async function(instanceid: string): Promise<number> {
    let currentTimeMillis: number = new Date().getTime();
    let doc = {
        instanceid: instanceid,
        timestamp: currentTimeMillis
    };
    let collection = await mongo.getCollection();
    let insertPromise = new Promise<InsertOneWriteOpResult>((resolve, reject) => {
        collection.insertOne(doc, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
    let res = await insertPromise;
    logger.info(`Inserted ${res.insertedCount} documents`);
    return res.insertedCount;
};

// Updates the timestamp to the current time
// <instanceid> instance id
// <return>     number of updated documents
var updateTimestamp = async function(instanceid: string): Promise<number> {
    let currentTimeMillis: number = new Date().getTime();
    let query = {
        instanceid: instanceid
    };
    let update = {
        $set: {
            timestamp: currentTimeMillis
        }
    };
    let collection = await mongo.getCollection();
    let updatePromise = new Promise<UpdateWriteOpResult>((resolve, reject) => {
        collection.updateOne(query, update, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
    let result = await updatePromise;
    return result.modifiedCount;
}

// Delete an instance by its ID
// <instanceid> instance id
// <return>     number of deleted documents
var removeInstance = async function(instanceid: string): Promise<number> {
    let query = {
        instanceid: instanceid
    };
    let collection = await mongo.getCollection();
    let deletePromise = new Promise<DeleteWriteOpResultObject>((resolve, reject) => {
        collection.deleteMany(query, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    });
    let result = await deletePromise;
    return result.deletedCount;
}

export {addInstance, updateTimestamp, removeInstance};