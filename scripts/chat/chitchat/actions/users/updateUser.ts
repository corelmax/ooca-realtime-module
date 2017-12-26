import { IDictionary, ServerImp } from "stalk-js";
import { BackendFactory } from "../../chats/BackendFactory";
import { ChitChatFactory } from "../../chats/ChitChatFactory";
const getConfig = () => ChitChatFactory.getInstance().config;

export async function updateUser(user: any) {
    try {
        const backendFactory = BackendFactory.getInstance();
        const server = backendFactory.getServer();

        const msg = {} as IDictionary;
        msg.user = user;
        msg["x-api-key"] = getConfig().Stalk.apiKey;
        msg["x-api-version"] = getConfig().Stalk.apiVersion;
        msg["x-app-id"] = getConfig().Stalk.appId;

        return await (server as ServerImp).getLobby().updateUser(msg);
    } catch (ex) {
        return ex.message;
    }
}
