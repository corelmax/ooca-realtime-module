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
var ajax = Rx.Observable.ajax;
var ChitChatFactory_1 = require("../ChitChatFactory");
var chitchatServiceUtils_1 = require("../utils/chitchatServiceUtils");
var getConfig = function () { return ChitChatFactory_1.ChitChatFactory.getInstance().config; };
var authReducer = function () { return ChitChatFactory_1.ChitChatFactory.getInstance().authStore; };
function getTeamProfile(token, team_id) {
    return Rx.Observable.ajax({
        url: getConfig().api.user + "/teamProfile?team_id=" + team_id,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        }
    });
}
exports.getTeamProfile = getTeamProfile;
function setOrgChartId(token, user, team_id, orgChartId) {
    return Rx.Observable.ajax({
        method: "POST",
        url: getConfig().api.user + "/setOrgChartId",
        body: JSON.stringify({
            user_id: user._id,
            username: user.username,
            team_id: team_id,
            org_chart_id: orgChartId
        }),
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        }
    });
}
exports.setOrgChartId = setOrgChartId;
function updateTeamProfile(user_id, team_id, profile) {
    return Rx.Observable.ajax({
        method: "POST",
        url: getConfig().api.user + "/teamProfile/" + team_id + "/" + user_id,
        body: JSON.stringify({
            profile: profile
        }),
        headers: chitchatServiceUtils_1.chitchat_headers()
    });
}
exports.updateTeamProfile = updateTeamProfile;
function fetchUser(username) {
    return ajax({
        method: "GET",
        url: getConfig().api.user + "/?username=" + username,
        headers: chitchatServiceUtils_1.chitchat_headers()
    });
}
exports.fetchUser = fetchUser;
function suggestUser(username, team_id) {
    return ajax({
        method: "GET",
        url: getConfig().api.user + "/suggest/?username=" + username + "&team_id=" + team_id,
        headers: chitchatServiceUtils_1.chitchat_headers()
    });
}
exports.suggestUser = suggestUser;
