import * as mongodb from 'mongodb';
import * as config from './config'
import { Logger } from './util/logger';

const logger = new Logger("mongo");

var getDb = async function(): Promise<mongodb.Db> {
    let MongoClient = mongodb.MongoClient;
    logger.info(`Connecting to ${config.getConfig().mongoConnectionString}`);
    let connectPromise = new Promise<mongodb.MongoClient>((resolve, reject) => {
        MongoClient.connect(config.getConfig().mongoConnectionString, (err, db) => {
            if (err) {
                reject(err);
            } else {
                resolve(db);
            }
        });
    });
    let db = await connectPromise;
    var dbo = db.db(config.getConfig().mongoDatabaseName);
    return dbo;
};

var dbInstance: mongodb.Db = null;

var getCollection = async function(collectionName: string): Promise<mongodb.Collection<any>> {
    if (dbInstance == null) {
        dbInstance = await getDb();
    }
    return dbInstance.collection(collectionName);
}

export {getCollection};