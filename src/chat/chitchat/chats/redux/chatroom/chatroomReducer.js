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
var immutable = __importStar(require("immutable"));
var chatroomActions_1 = require("./chatroomActions");
var chatroomRxActions = __importStar(require("./chatroomRxEpic"));
var chatroomActions = __importStar(require("./chatroomActions"));
var chatlistsRx_1 = require("../../../../actions/chatlistsRx");
// Define our record defaults
var chatroomDefaults = {
    isFetching: false,
    state: "",
    room: null,
    chatTargets: "*",
    responseFile: null,
    messages: [],
    earlyMessageReady: false,
    uploadingFile: null,
    fileInfo: null,
    error: null,
    chatDisabled: false,
    chatrooms: []
};
// Create our FruitRecord class
var ChatRoomRecoder = /** @class */ (function (_super) {
    __extends(ChatRoomRecoder, _super);
    // Set the params. This will also typecheck when we instantiate a new FruitRecord
    function ChatRoomRecoder(params) {
        return _super.call(this, params) || this;
    }
    // This following line is the magic. It overrides the "get" method of record
    // and lets typescript know the return type based on our IFruitParams interface
    ChatRoomRecoder.prototype.get = function (value) {
        // super.get() is mapped to the original get() function on Record
        return _super.prototype.get.call(this, value);
    };
    return ChatRoomRecoder;
}(immutable.Record(chatroomDefaults)));
exports.ChatRoomRecoder = ChatRoomRecoder;
exports.chatRoomRecoder = new ChatRoomRecoder(chatroomDefaults);
exports.chatroomReducer = function (state, action) {
    if (state === void 0) { state = exports.chatRoomRecoder; }
    switch (action.type) {
        case chatlistsRx_1.GET_ALL_CHATROOM_SUCCESS: {
            return state.set("chatrooms", action.payload);
        }
        case chatroomActions.JOIN_ROOM_FAILURE: {
            return state.set("state", chatroomActions.JOIN_ROOM_FAILURE)
                .set("chatDisabled", true);
        }
        case chatroomActions.JOIN_ROOM_SUCCESS: {
            return state.set("state", chatroomActions.JOIN_ROOM_SUCCESS)
                .set("chatDisabled", false);
        }
        case chatroomActions.DISABLE_CHATROOM: {
            return state.set("state", chatroomActions.DISABLE_CHATROOM)
                .set("chatDisabled", true);
        }
        case chatroomActions.ENABLE_CHATROOM: {
            return state.set("state", chatroomActions.ENABLE_CHATROOM)
                .set("chatDisabled", false);
        }
        case chatroomRxActions.CHATROOM_UPLOAD_FILE: {
            return state.set("state", chatroomRxActions.CHATROOM_UPLOAD_FILE)
                .set("uploadingFile", action.payload.data.target.result)
                .set("fileInfo", action.payload.file); // action.payload.form['file']
        }
        case chatroomRxActions.CHATROOM_UPLOAD_FILE_FAILURE: {
            return state.set("state", chatroomRxActions.CHATROOM_UPLOAD_FILE_FAILURE)
                .set("error", JSON.stringify(action.payload.message));
        }
        case chatroomRxActions.CHATROOM_UPLOAD_FILE_SUCCESS: {
            return state.set("state", chatroomRxActions.CHATROOM_UPLOAD_FILE_SUCCESS)
                .set("responseFile", action.payload);
        }
        case chatroomActions_1.SEND_MESSAGE_FAILURE: {
            var payload = action.payload;
            var nextState = state.set("state", chatroomActions_1.SEND_MESSAGE_FAILURE)
                .set("isFetching", false)
                .set("error", payload);
            return nextState;
        }
        case chatroomActions_1.ON_MESSAGE_CHANGED: {
            var payload = action.payload;
            return state.set("messages", payload);
        }
        case chatroomActions_1.ON_EARLY_MESSAGE_READY: {
            var payload = action.payload;
            return state.set("state", chatroomActions_1.ON_EARLY_MESSAGE_READY)
                .set("earlyMessageReady", payload);
        }
        case chatroomActions.LOAD_EARLY_MESSAGE_SUCCESS: {
            var payload = action.payload;
            return state.set("messages", payload)
                .set("state", chatroomActions.LOAD_EARLY_MESSAGE_SUCCESS);
        }
        case chatroomRxActions.GET_PERSISTEND_MESSAGE_SUCCESS: {
            var payload = action.payload;
            return state.set("messages", payload);
        }
        case chatroomActions_1.GET_NEWER_MESSAGE_SUCCESS: {
            var payload = action.payload;
            return state.set("messages", payload);
        }
        /**Create chat room */
        case chatroomRxActions.GET_MY_ROOM_SUCCESS: {
            return state.set("isFetching", false)
                .set("state", chatroomRxActions.GET_MY_ROOM_SUCCESS)
                .set("room", action.payload);
        }
        case chatroomRxActions.GET_MY_ROOM_FAILURE: {
            return state.set("isFetching", false)
                .set("state", chatroomRxActions.GET_MY_ROOM_FAILURE)
                .set("room", null);
        }
        /**Fetch chat room */
        case chatroomRxActions.FETCH_PRIVATE_CHATROOM:
            return state.set("isFetching", true);
        case chatroomRxActions.FETCH_PRIVATE_CHATROOM_SUCCESS:
            return state.set("room", action.payload)
                .set("isFetching", false)
                .set("state", chatroomRxActions.FETCH_PRIVATE_CHATROOM_SUCCESS);
        case chatroomRxActions.FETCH_PRIVATE_CHATROOM_CANCELLED:
            return state.set("isFetching", false);
        case chatroomRxActions.FETCH_PRIVATE_CHATROOM_FAILURE:
            return state.set("state", chatroomRxActions.FETCH_PRIVATE_CHATROOM_FAILURE)
                .set("isFetching", false)
                .set("room", null);
        /** Set room */
        case chatroomActions.GET_PERSISTEND_CHATROOM:
            return state.set("isFetching", false);
        case chatroomActions.GET_PERSISTEND_CHATROOM_SUCCESS: {
            return state.set("room", action.payload);
        }
        case chatroomActions.GET_PERSISTEND_CHATROOM_FAILURE: {
            return state.set("room", null);
        }
        /**Set room empty */
        case chatroomActions.LEAVE_ROOM: {
            return state
                .set("state", chatroomActions.LEAVE_ROOM)
                .set("room", null);
        }
        case chatroomActions.UPDATED_CHATROOMS: {
            return state.set("chatrooms", action.payload);
        }
        // case actions.GET_ADMIN_ROLE_IDS_SUCCESS: {
        //     return state.set("chatTargets", action.payload);
        // }
        // case actions.GET_CHAT_TARGET_ID: {
        //     return state.set("chatTargets", [action.payload]);
        // }
        default:
            return state;
    }
};
