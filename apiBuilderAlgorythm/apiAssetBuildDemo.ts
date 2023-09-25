import { getHelix, getFloor, getMiddleCol, getRoof } from './algo';
import { ConsoleColors, IFileInfo } from './types';
import { createLandAssetsFromConfig, getBearerToken, getFileStatus, getJobInfo, requestFileUploadUrl, uploadAssetsAsJson } from './api';

const email = 'seoseo0218@gmail.com';
const password = 'Qweqwe$123';

(async () => {
    try {
        const bearerToken = await getBearerToken(email, password);

        console.log('Bearer: ', bearerToken, '\n');

        const landId = 'Land-33092140-cc78-4f17-8dfc-013031ef781b';

        const assetsToBuild = [...getRoof(), ...getFloor(), ...getMiddleCol(), ...getHelix(), ...getHelix(true)];

        const fileData = await requestFileUploadUrl('MyMetaverseConfig.json', bearerToken);
        await uploadAssetsAsJson(fileData.uploadUrl, assetsToBuild);

        let fileInfo: IFileInfo = { _id: fileData._id, SK: fileData._id, isValid: undefined };

        do {
            await new Promise(resolve => setTimeout(resolve, 1000));
            fileInfo = await getFileStatus(fileData._id, bearerToken);
        } while (fileInfo.isValid === undefined);

        if (!fileInfo.isValid) {
            console.log(ConsoleColors.BgRed, 'FileValidation failed with reason: ', fileInfo.reason);
            return;
        }

        const createJob = await createLandAssetsFromConfig(landId, fileData._id, bearerToken);

        let status: string | undefined = undefined;
        do {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const jobInfo = await getJobInfo(createJob._id, createJob.SK, bearerToken);
            status = jobInfo.status;
            console.log(`CreateContent status: `, status);
        } while (status === 'Queued' || status === 'InProgress');

        console.log(status);
    } catch (ex) {
        console.log(ex);
    }
})().then(_ => console.log('done'));