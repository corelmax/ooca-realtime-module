"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChitChatFactory_1 = require("../ChitChatFactory");
const getConfig = () => ChitChatFactory_1.ChitChatFactory.getInstance().config;
exports.chitchat_headers = () => ({
    "Content-Type": "application/json",
    "cache-control": "no-cache",
    "x-api-key": getConfig().api.apiKey,
    "Access-Control-Allow-Credentials": "*",
    "Access-Control-Allow-Origin": "*"
});
exports.withToken = (headers) => (token) => {
    headers["x-access-token"] = token;
    return headers;
};
