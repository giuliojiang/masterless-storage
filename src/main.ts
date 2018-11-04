import * as mongo from './mongo';
import * as mongoinstances from './mongoinstances';

var main = async function() {
    var collection = await mongo.getCollection();
    console.info("Got the collection object");
    await mongoinstances.addInstance("faser");
};

main();