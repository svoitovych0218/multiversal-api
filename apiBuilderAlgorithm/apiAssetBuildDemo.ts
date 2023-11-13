import { getHelix, getFloor, getMiddleCol, getRoof } from './algo';
import { ConsoleColors, IAssetRequest, IFileInfo } from './types';
import { createLandAssetsFromConfig, getBearerToken, getFileStatus, getJobInfo, requestFileUploadUrl, uploadAssetsAsJson } from './api';
import { mondrianAlgorithm } from './mondrianAlgorithm';
import { email, password } from './credentials';

enum Algo {
    Helux = 'helux',
    Modrian = 'modrian'
}

(async () => {
    const args = process.argv.slice(2);
    if (!Object.values(Algo).some(s => s === args[0])) {
        console.log(`Wrong algorithm selected, please use one of: ${Object.values(Algo).join(', ')}`);
        return;
    }
    const algo = args[0] as Algo;

    try {
        const bearerToken = await getBearerToken(email, password);

        //choose landId from list of your metaverses
        //showMyMetaverses.ts - to log list
        const landId = 'Land-33092140-cc78-4f17-8dfc-013031ef781b';

        const assetsToBuild: IAssetRequest[] = [];
        if (algo === Algo.Helux) {
            // Helux algorithm
            const assets = [...getRoof(), ...getFloor(), ...getMiddleCol(), ...getHelix(), ...getHelix(true)];
            assetsToBuild.push(...assets);
        } else if (algo === Algo.Modrian) {
            //mondarian algorithm adjusted to 3D space generation
            const assets = mondrianAlgorithm(1000000, 6);
            assetsToBuild.push(...assets);
        }


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
        console.log('Create content job key: ', { _id: createJob._id, SK: createJob.SK });

        let status: string | undefined = undefined;
        let timeout = 1000;
        do {
            await new Promise(resolve => setTimeout(resolve, 1000));
            timeout += 200;
            try {
                const jobInfo = await getJobInfo(createJob._id, createJob.SK, bearerToken);
                status = jobInfo.status;
                console.log(`CreateContent status: `, status);
            } catch (ex: any) {
                if (ex.response.status === 502) {
                    timeout += 500;
                    continue;
                }
            }
        } while (status === 'Queued' || status === 'InProgress');
    } catch (ex) {
        console.log(ex);
    }
})().then(_ => console.log('done'));