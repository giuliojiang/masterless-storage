import * as hello from "./hello";
import * as mongo from './mongo';

var main = async function() {
    var collection = await mongo.getCollection();
    console.info("Got the collection object");
};

main();