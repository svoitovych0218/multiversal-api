import { cleanupLandContent, getBearerToken, getJobInfo } from "./api";
import { email, password } from "./credentials";

(async () => {
    const bearerToken = await getBearerToken(email, password);

    // Id of your land to cleanUp;
    const landId = 'Land-33092140-cc78-4f17-8dfc-013031ef781b';

    const cleanupJob = await cleanupLandContent(landId, bearerToken);
    console.log('cleanup job key: ', { _id: cleanupJob._id, SK: cleanupJob.SK });
    let timeout = 1000;
    let status: string;
    do {
        await new Promise(resolve => setTimeout(resolve, timeout));
        timeout += 200;
        const jobInfo = await getJobInfo(cleanupJob._id, cleanupJob.SK, bearerToken);
        status = jobInfo.status;
        console.log(`CleanupJob status: `, status);
    } while (status === 'Queued' || status === 'InProgress');
})().then(_ => console.log('done'));