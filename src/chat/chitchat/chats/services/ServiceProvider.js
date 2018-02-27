"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var Rx = __importStar(require("rxjs/Rx"));
var ChitChatFactory_1 = require("../ChitChatFactory");
var chitchatServiceUtils_1 = require("../utils/chitchatServiceUtils");
var getConfig = function () { return ChitChatFactory_1.ChitChatFactory.getInstance().config; };
var authReducer = function () { return ChitChatFactory_1.ChitChatFactory.getInstance().authStore; };
function getLastAccessRoomInfo(user_id) {
    return fetch(getConfig().api.user + "/lastAccessRoom?user_id=" + user_id, {
        method: "GET",
        headers: chitchatServiceUtils_1.chitchat_headers()
    });
}
exports.getLastAccessRoomInfo = getLastAccessRoomInfo;
function updateLastAccessRoomInfo(user_id, room_id) {
    return Rx.Observable.ajax({
        url: getConfig().api.user + "/lastAccessRoom",
        method: "POST",
        headers: chitchatServiceUtils_1.chitchat_headers(),
        body: JSON.stringify({
            room_id: room_id,
            user_id: user_id
        })
    });
}
exports.updateLastAccessRoomInfo = updateLastAccessRoomInfo;
function removeLastAccessRoomInfo(user_id, room_id) {
    return Rx.Observable.ajax({
        url: getConfig().api.user + "/lastAccessRoom",
        method: "DELETE",
        headers: chitchatServiceUtils_1.chitchat_headers(),
        body: JSON.stringify({ room_id: room_id, user_id: user_id })
    });
}
exports.removeLastAccessRoomInfo = removeLastAccessRoomInfo;
