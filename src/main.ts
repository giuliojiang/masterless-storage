import * as mongo from './mongo';
import * as mongoinstances from './mongoinstances';
import * as instance from './instance'; 
import { Logger } from './util/logger';

const logger = new Logger("main");

var main = async function() {
    await instance.startInstance();
    logger.info(`Started instance ${instance.instanceid}`);
};

main();