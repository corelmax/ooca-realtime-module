import { ChitChatFactory } from "./chitchat/chats/ChitChatFactory";
import { IConfig, IChitChatApi, IStalkApi } from "./chitchat/chats/iConfig";
export const chitchatFactory = ChitChatFactory.createInstance();

const apiStalk = "wss://chitchats.ga"; // wss://chitchats.ga
const stalkPort = 3020;
const stalkKey = "ooca1234";
const stalkApiVersion = "0.2";
const stalkAppId = "ooca";
const chatapi = "http://chitchats.ga:8998"; // "http://localhost:9000"; "http://git.animation-genius.com:9000"

export const config = {
    Stalk: {
        apiKey: stalkKey,
        apiVersion: stalkApiVersion,
        appId: stalkAppId,
        chat: `${apiStalk}`,
        port: stalkPort,
    } as IStalkApi,
    api: {
        apiKey: "survey1234",
        host: `${chatapi}`,
        api: `${chatapi}/api`,
        auth: `${chatapi}/api/auth`,
        user: `${chatapi}/api/users`,
        team: `${chatapi}/api/team`,
        group: `${chatapi}/api/group`,
        orgChart: `${chatapi}/api/orgChart`,
        chatroom: `${chatapi}/api/chatroom`,
        message: `${chatapi}/api/stalk/message`,
        fileUpload: `${chatapi}/chats/upload`,
    } as IChitChatApi,
    appConfig: {
        encryption: false,
        secret: "",
    },
} as IConfig;
