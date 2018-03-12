import { createAction } from "redux-actions";
import { IDictionary, ServerImp } from "stalk-js";

import { BackendFactory } from "../../chats/BackendFactory";
import { chitchatFactory } from "../../../Chitchat";
const getConfig = () => chitchatFactory.config;
const store = () => chitchatFactory.getStore();

export const FETCH_USERS_PAYLOAD = "FETCH_USERS_PAYLOAD";
const fetchUsersPayloadSuccess = createAction(FETCH_USERS_PAYLOAD, (payload: any) => payload);

export async function getUsersPayload() {
    const backendFactory = BackendFactory.getInstance();
    const server = backendFactory.getServer();

    const msg = {} as IDictionary;
    msg["x-api-key"] = getConfig().Stalk.apiKey;
    msg["x-api-version"] = getConfig().Stalk.apiVersion;
    msg["x-app-id"] = getConfig().Stalk.appId;

    const result = await (server as ServerImp).getLobby().getUsersPayload(msg);
    if (result.code == 200) {
        store().dispatch(fetchUsersPayloadSuccess(result.data.value));
    }

    return result;
}

export default getUsersPayload;