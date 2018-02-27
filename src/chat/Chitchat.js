"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChitChatFactory_1 = require("./chitchat/chats/ChitChatFactory");
exports.chitchatFactory = ChitChatFactory_1.ChitChatFactory.createInstance();
var apiStalk = "" + process.env.STALK_ENDPOINT; // wss://chitchats.ga
var stalkPort = 3020;
var stalkKey = "ooca1234";
var stalkApiVersion = "0.2";
var stalkAppId = "" + process.env.STALK_APP_ID;
var chatapi = "http://chitchats.ga:8998"; // "http://localhost:9000"; "http://git.animation-genius.com:9000"
exports.config = {
    Stalk: {
        apiKey: stalkKey,
        apiVersion: stalkApiVersion,
        appId: stalkAppId,
        chat: "" + apiStalk,
        port: stalkPort,
    },
    api: {
        apiKey: "survey1234",
        host: "" + chatapi,
        api: chatapi + "/api",
        auth: chatapi + "/api/auth",
        user: chatapi + "/api/users",
        team: chatapi + "/api/team",
        group: chatapi + "/api/group",
        orgChart: chatapi + "/api/orgChart",
        chatroom: chatapi + "/api/chatroom",
        message: chatapi + "/api/stalk/message",
        fileUpload: chatapi + "/chats/upload",
    },
    appConfig: {
        encryption: false,
        secret: "",
    },
};
