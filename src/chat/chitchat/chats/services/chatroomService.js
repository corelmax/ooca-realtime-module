"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChitChatFactory_1 = require("../ChitChatFactory");
var chitchatServiceUtils_1 = require("../utils/chitchatServiceUtils");
var getConfig = function () { return ChitChatFactory_1.ChitChatFactory.getInstance().config; };
var authReducer = function () { return ChitChatFactory_1.ChitChatFactory.getInstance().authStore; };
exports.getRoomInfo = function (room_id) {
    return fetch(getConfig().api.chatroom + "/roomInfo?room_id=" + room_id, {
        method: "GET",
        headers: chitchatServiceUtils_1.withToken(chitchatServiceUtils_1.chitchat_headers())(authReducer().chitchat_token)
    });
};
exports.getUnreadMessage = function (room_id, user_id, lastAccessTime) {
    return fetch(getConfig().api.chatroom + "/unreadMessage?room_id=" + room_id + "&user_id=" + user_id + "&lastAccessTime=" + lastAccessTime, {
        method: "GET",
        headers: chitchatServiceUtils_1.chitchat_headers()
    });
};
exports.getOlderMessagesCount = function (room_id, topEdgeMessageTime, queryMessage) {
    return fetch(getConfig().api.chatroom + "/olderMessagesCount/?message=" + queryMessage + "&room_id=" + room_id + "&topEdgeMessageTime=" + topEdgeMessageTime, {
        method: "GET",
        headers: chitchatServiceUtils_1.chitchat_headers()
    });
};
exports.getNewerMessages = function (room_id, lastMessageTime) {
    return fetch(getConfig().api.chatroom + "/getChatHistory", {
        body: JSON.stringify({
            room_id: room_id,
            lastMessageTime: lastMessageTime
        }),
        method: "POST",
        headers: chitchatServiceUtils_1.chitchat_headers()
    });
};
exports.getPrivateChatroom = function (ownerId, roommateId) {
    return fetch("" + getConfig().api.chatroom, {
        method: "POST",
        headers: chitchatServiceUtils_1.chitchat_headers(),
        body: JSON.stringify({
            ownerId: ownerId,
            roommateId: roommateId
        })
    });
};
