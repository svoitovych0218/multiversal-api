import { getBearerToken, getGeneralInventoryItems } from "./api";
import { email, password } from "./credentials";

(async () => {
    const bearerToken = await getBearerToken(email, password);

    const res = await getGeneralInventoryItems(bearerToken);
    console.log(res);
})().then(_ => console.log('done'));