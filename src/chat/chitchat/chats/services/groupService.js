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
var ajax = Rx.Observable.ajax;
var ChitChatFactory_1 = require("../ChitChatFactory");
var chitchatServiceUtils_1 = require("../utils/chitchatServiceUtils");
var getConfig = function () { return ChitChatFactory_1.ChitChatFactory.getInstance().config; };
var authReducer = function () { return ChitChatFactory_1.ChitChatFactory.getInstance().authStore; };
function addMember(room_id, member) {
    return ajax({
        method: "POST",
        url: getConfig().api.group + "/addMember/" + room_id,
        body: JSON.stringify({ member: member }),
        headers: chitchatServiceUtils_1.chitchat_headers()
    });
}
exports.addMember = addMember;
function removeMember(room_id, member_id) {
    return ajax({
        method: "POST",
        url: getConfig().api.group + "/removeMember/" + room_id,
        body: JSON.stringify({ member_id: member_id }),
        headers: chitchatServiceUtils_1.withToken(chitchatServiceUtils_1.chitchat_headers())(authReducer().chitchat_token)
    });
}
exports.removeMember = removeMember;
