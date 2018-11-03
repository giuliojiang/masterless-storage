import * as mongodb from 'mongodb';

var connectionString: string = "mongodb://localhost:27017";
var databaseName: string = "masterlessstorage";
var collectionName: string = "masterlessstorage";

module.exports.getDb = async function(): Promise<mongodb.Collection<any>> {
    let MongoClient = mongodb.MongoClient;
    let connectPromise = new Promise<mongodb.MongoClient>((resolve, reject) => {
        MongoClient.connect(connectionString, (err, db) => {
            if (err) {
                reject(err);
            } else {
                resolve(db);
            }
        });
    });
    let db = await connectPromise;
    var dbo = db.db(databaseName);
    var collection = dbo.collection(collectionName);
    return collection;
}