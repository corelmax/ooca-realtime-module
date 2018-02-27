"use strict";
/**
 * Copyright 2016 Ahoo Studio.co.th.
 *
 * This is pure function for redux app.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var ChatlogsActions = __importStar(require("../chatlogs/chatlogsActions"));
var ChatlogRxActions = __importStar(require("../chatlogs/chatlogRxActions"));
var actions = __importStar(require("../../../../actions/"));
var immutable_1 = require("immutable");
// Define our record defaults
var defaultChatlog = {
    isFetching: false,
    state: "",
    chatsLog: [],
    roomAccess: null,
    error: ""
};
// Create our FruitRecord class
var ChatLogRecorder = /** @class */ (function (_super) {
    __extends(ChatLogRecorder, _super);
    // Set the params. This will also typecheck when we instantiate a new FruitRecord
    function ChatLogRecorder(params) {
        return _super.call(this, params) || this;
    }
    // This following line is the magic. It overrides the "get" method of record
    // and lets typescript know the return type based on our IFruitParams interface
    ChatLogRecorder.prototype.get = function (value) {
        // super.get() is mapped to the original get() function on Record
        return _super.prototype.get.call(this, value);
    };
    return ChatLogRecorder;
}(immutable_1.Record(defaultChatlog)));
exports.ChatLogRecorder = ChatLogRecorder;
exports.chatlogInitRecord = new ChatLogRecorder(defaultChatlog);
function chatlogReducer(state, action) {
    if (state === void 0) { state = exports.chatlogInitRecord; }
    switch (action.type) {
        case ChatlogsActions.ON_CHATLOG_CHANGE: {
            var prev = state.get("chatsLog");
            var next = prev.filter(function (log) { return log.rid != action.payload.rid; });
            next.push(action.payload);
            return state.set("chatsLog", next);
        }
        case actions.GET_RECENT_MESSAGE_SUCCESS: {
            return state.set("chatsLog", action.payload);
        }
        case ChatlogRxActions.GET_LAST_ACCESS_ROOM: {
            return state.set("isFetching", true);
        }
        case ChatlogRxActions.GET_LAST_ACCESS_ROOM_SUCCESS: {
            var data = action.payload;
            if (Array.isArray(data) && data.length > 0) {
                return state.set("roomAccess", data[0].roomAccess).set("isFetching", false);
            }
            else {
                return state.set("isFetching", false);
            }
        }
        case ChatlogRxActions.GET_LAST_ACCESS_ROOM_FAILURE: {
            return state.set("roomAccess", null)
                .set("isFetching", false);
        }
        case ChatlogRxActions.UPDATE_LAST_ACCESS_ROOM_SUCCESS: {
            return state.set("roomAccess", action.payload)
                .set("isFetching", false);
        }
        case ChatlogRxActions.UPDATE_LAST_ACCESS_ROOM_FAILURE: {
            return state.set("isFetching", false);
        }
        case ChatlogRxActions.STALK_REMOVE_ROOM_ACCESS: {
            return state.set("isFetching", true)
                .set("state", ChatlogRxActions.STALK_REMOVE_ROOM_ACCESS);
        }
        case ChatlogRxActions.STALK_REMOVE_ROOM_ACCESS_SUCCESS: {
            var data = action.payload;
            if (Array.isArray(data) && data.length > 0) {
                return state.set("roomAccess", data[0].roomAccess)
                    .set("isFetching", false)
                    .set("state", ChatlogRxActions.STALK_REMOVE_ROOM_ACCESS_SUCCESS);
            }
            else {
                return state.set("isFetching", false)
                    .set("state", ChatlogRxActions.STALK_REMOVE_ROOM_ACCESS_SUCCESS);
            }
        }
        case ChatlogRxActions.STALK_REMOVE_ROOM_ACCESS_FAILURE: {
            return state.set("isFetching", false);
        }
        default:
            return state;
    }
}
exports.chatlogReducer = chatlogReducer;
