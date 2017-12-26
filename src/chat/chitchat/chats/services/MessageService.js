"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rx = require("rxjs");
const ChitChatFactory_1 = require("../ChitChatFactory");
const chitchatServiceUtils_1 = require("../utils/chitchatServiceUtils");
const getConfig = () => ChitChatFactory_1.ChitChatFactory.getInstance().config;
const authReducer = () => ChitChatFactory_1.ChitChatFactory.getInstance().authStore;
const { ajax } = Rx.Observable;
function updateMessageReader(message_id, room_id) {
    return fetch(`${getConfig().api.message}/updateReader`, {
        method: "POST",
        headers: chitchatServiceUtils_1.chitchat_headers(),
        body: JSON.stringify({ room_id: room_id, message_id: message_id })
    });
}
exports.updateMessageReader = updateMessageReader;
function updateMessagesReader(messages_id, room_id) {
    return fetch(`${getConfig().api.message}/updateMessagesReader`, {
        method: "POST",
        headers: chitchatServiceUtils_1.chitchat_headers(),
        body: JSON.stringify({ room_id: room_id, messages: messages_id })
    });
}
exports.updateMessagesReader = updateMessagesReader;
