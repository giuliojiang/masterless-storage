import * as mongodb from 'mongodb';
import { config } from './../local/config';

var getDb = async function(): Promise<mongodb.Collection<any>> {
    let MongoClient = mongodb.MongoClient;
    let connectPromise = new Promise<mongodb.MongoClient>((resolve, reject) => {
        MongoClient.connect(config.mongoConnectionString, (err, db) => {
            if (err) {
                reject(err);
            } else {
                resolve(db);
            }
        });
    });
    let db = await connectPromise;
    var dbo = db.db(config.mongoDatabaseName);
    var collection = dbo.collection(config.mongoCollectionName);
    return collection;
};

var dbInstance: mongodb.Collection<any> = null;

var getCollection = async function(): Promise<mongodb.Collection<any>> {
    if (dbInstance == null) {
        dbInstance = await getDb();
    }
    return dbInstance;
}

export {getCollection};