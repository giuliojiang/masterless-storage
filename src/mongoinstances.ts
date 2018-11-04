import * as mongo from './mongo';
import { InsertOneWriteOpResult } from 'mongodb';

var addInstance = async function(instanceid: string) {
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
    console.info(`Inserted ${res.insertedCount} documents`);
};

export {addInstance};