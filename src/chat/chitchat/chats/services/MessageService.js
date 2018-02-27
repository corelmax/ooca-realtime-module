"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var Rx = __importStar(require("rxjs"));
var ChitChatFactory_1 = require("../ChitChatFactory");
var chitchatServiceUtils_1 = require("../utils/chitchatServiceUtils");
var getConfig = function () { return ChitChatFactory_1.ChitChatFactory.getInstance().config; };
var authReducer = function () { return ChitChatFactory_1.ChitChatFactory.getInstance().authStore; };
var ajax = Rx.Observable.ajax;
function updateMessageReader(message_id, room_id) {
    return fetch(getConfig().api.message + "/updateReader", {
        method: "POST",
        headers: chitchatServiceUtils_1.chitchat_headers(),
        body: JSON.stringify({ room_id: room_id, message_id: message_id })
    });
}
exports.updateMessageReader = updateMessageReader;
function updateMessagesReader(messages_id, room_id) {
    return fetch(getConfig().api.message + "/updateMessagesReader", {
        method: "POST",
        headers: chitchatServiceUtils_1.chitchat_headers(),
        body: JSON.stringify({ room_id: room_id, messages: messages_id })
    });
}
exports.updateMessagesReader = updateMessagesReader;
