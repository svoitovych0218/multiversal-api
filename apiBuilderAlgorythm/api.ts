import axios from "axios";
import { ConsoleColors, IAssetRequest, IFileInfo, ILandJob } from "./types";
import fs from 'fs';

const baseUrl = 'https://jmkre9md1i.execute-api.eu-central-1.amazonaws.com/stage';
const firebaseAuthUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyBmpyZNSYW17Mshe0V9WRJcwSNFsFcKRBk';

export const getBearerToken = async (email: string, password: string) => {
    const login1Response = await axios.post(`${baseUrl}/auth/login`, { email, password });
    const token = login1Response.data.data.token;

    const login2Response = await axios.post(firebaseAuthUrl, { returnSecureToken: true, token: token });
    const bearerToken = login2Response.data.idToken;

    return bearerToken;
}

export const cleanupLandContent = async (landId: string, bearerToken: string) => {
    const res = await axios.post(`${baseUrl}/land/${landId}/cleanup-content`, null, { headers: { Authorization: `Bearer ${bearerToken}` } });
    return res.data.data.job as { _id: string, SK: string, status: string };
}

export const getJobInfo = async (_id: string, SK: string, bearerToken: string) => {
    const res = await axios.get(`${baseUrl}/land/${_id}/job/${SK}`, { headers: { Authorization: `Bearer ${bearerToken}` } });
    return res.data.data.job as ILandJob;
}

export const requestFileUploadUrl = async (fileName: string, bearerToken: string) => {
    const res = await axios.post(`${baseUrl}/file/metaverse-config`, { fileName }, { headers: { Authorization: `Bearer ${bearerToken}` } });
    return res.data.data as { _id: string, uploadUrl: string };
}

export const uploadAssetsAsJson = async (url: string, assets: IAssetRequest[]) => {
    const json = JSON.stringify({ assets });
    const response = await axios.put(url, Buffer.from(json), { headers: { 'Content-Type': 'application/json' } });
    console.log(response.status);
    // console.log(response);
}

export const getFileStatus = async (id: string, bearerToken: string) => {
    const res = await axios.get(`${baseUrl}/files/${id}`, { headers: { Authorization: `Bearer ${bearerToken}` } });
    return res.data.data as IFileInfo;
}

export const createLandAssetsFromConfig = async (landId: string, configId: string, bearerToken: string) => {
    const res = await axios.post(`${baseUrl}/land/${landId}/assets-config/${configId}`, null, { headers: { Authorization: `Bearer ${bearerToken}` } });
    return res.data.data.job as { _id: string, SK: string, status: string };
}

export const getMyMetaverses = async (bearerToken: string) => {
    const res = await axios.get(`${baseUrl}/my-lands`, { headers: { Authorization: `Bearer ${bearerToken}` } });
    return res.data.data.lands;
}