"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChitChatFactory_1 = require("./chitchat/chats/ChitChatFactory");
exports.chitchatFactory = ChitChatFactory_1.ChitChatFactory.createInstance();
const apiStalk = "wss://chitchats.ga"; // wss://chitchats.ga
const stalkPort = 3020;
const stalkKey = "ooca1234";
const stalkApiVersion = "0.2";
const stalkAppId = "ooca";
const chatapi = "http://chitchats.ga:8998"; // "http://localhost:9000"; "http://git.animation-genius.com:9000"
exports.config = {
    Stalk: {
        apiKey: stalkKey,
        apiVersion: stalkApiVersion,
        appId: stalkAppId,
        chat: `${apiStalk}`,
        port: stalkPort,
    },
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
    },
    appConfig: {
        encryption: false,
        secret: "",
    },
};
