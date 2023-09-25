import { cleanupLandContent, getBearerToken, getJobInfo, getMyMetaverses } from "./api";
import { email, password } from "./credentials";

(async () => {
    const bearerToken = await getBearerToken(email, password);

    const res = await getMyMetaverses(bearerToken);
    console.log(res);
})().then(_ => console.log('done'));