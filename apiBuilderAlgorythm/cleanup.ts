import { cleanupLandContent, getBearerToken, getJobInfo } from "./api";
import { email, password } from "./credentials";

(async () => {
    const bearerToken = await getBearerToken(email, password);

    console.log('Bearer: ', bearerToken, '\n');

    // Id of your land to cleanUp;
    const landId = 'Land-33092140-cc78-4f17-8dfc-013031ef781b';

    const cleanupJob = await cleanupLandContent(landId, bearerToken);
    let status: string;
    do {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const jobInfo = await getJobInfo(cleanupJob._id, cleanupJob.SK, bearerToken);
        status = jobInfo.status;
        console.log(`CleanupJob status: `, status);
    } while (status === 'Queued' || status === 'InProgress');
    console.log('Result:', status);
})().then(_=> console.log('done'));