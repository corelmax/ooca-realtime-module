"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MemberRole;
(function (MemberRole) {
    MemberRole[MemberRole["member"] = 0] = "member";
    MemberRole[MemberRole["admin"] = 1] = "admin";
    MemberRole[MemberRole["owner"] = 2] = "owner";
})(MemberRole = exports.MemberRole || (exports.MemberRole = {}));
var RoomType;
(function (RoomType) {
    RoomType[RoomType["organizationGroup"] = 0] = "organizationGroup";
    RoomType[RoomType["projectBaseGroup"] = 1] = "projectBaseGroup";
    RoomType[RoomType["privateGroup"] = 2] = "privateGroup";
    RoomType[RoomType["privateChat"] = 3] = "privateChat";
})(RoomType = exports.RoomType || (exports.RoomType = {}));
;
var RoomStatus;
(function (RoomStatus) {
    RoomStatus[RoomStatus["active"] = 0] = "active";
    RoomStatus[RoomStatus["disable"] = 1] = "disable";
    RoomStatus[RoomStatus["delete"] = 2] = "delete";
})(RoomStatus = exports.RoomStatus || (exports.RoomStatus = {}));
;
var Room = /** @class */ (function () {
    function Room() {
    }
    return Room;
}());
exports.Room = Room;
