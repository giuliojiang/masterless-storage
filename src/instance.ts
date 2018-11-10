import * as uuid from 'uuid';
import * as mongoinstances from './mongoinstances';
import * as timeutil from './util/timeutil';
import { Logger } from './util/logger';

const instanceid: string = uuid.v4();
const logger: Logger = new Logger("instance");

var heartbeatLoop = async function() {
    let minuteInMillis: number = 60 * 1000;
    while (true) {
        await timeutil.sleep(minuteInMillis);
        let updateCount: number = await mongoinstances.updateTimestamp(instanceid);
        logger.info(`instances: Heartbeat updated ${updateCount} rows`);
    }
}

// Starts the current instance of the server.
// Registers the server id in the database, and starts
// the heartbeat loop
var startInstance = async function() {

    // Insert this instance into the database
    let insertedCount: number = await mongoinstances.addInstance(instanceid);
    logger.info(`instances: Registered instance ${instanceid}, inserted ${insertedCount} rows`);

    // Start heartbeat loop
    var heartbeatPromise = heartbeatLoop();
    // Don't await, this promise never resolves

}

export {startInstance, instanceid}