"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChitChatFactory_1 = require("../ChitChatFactory");
var getConfig = function () { return ChitChatFactory_1.ChitChatFactory.getInstance().config; };
exports.chitchat_headers = function () { return ({
    "Content-Type": "application/json",
    "cache-control": "no-cache",
    "x-api-key": getConfig().api.apiKey,
    "Access-Control-Allow-Credentials": "*",
    "Access-Control-Allow-Origin": "*"
}); };
exports.withToken = function (headers) { return function (token) {
    headers["x-access-token"] = token;
    return headers;
}; };
