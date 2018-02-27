"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright 2016 Ahoo Studio.co.th.
 *
 * This is pure function action for redux app.
 */
var Rx = __importStar(require("rxjs/Rx"));
var redux_actions_1 = require("redux-actions");
var _a = Rx.Observable, ajax = _a.ajax, fromPromise = _a.fromPromise;
var ChatRoomComponent_1 = require("../../ChatRoomComponent");
var ChitChatFactory_1 = require("../../ChitChatFactory");
var chatroomActions_1 = require("./chatroomActions");
var chitchatServiceUtils_1 = require("../../utils/chitchatServiceUtils");
var chatroomService = __importStar(require("../../services/chatroomService"));
var MessageService_1 = require("../../services/MessageService");
var getConfig = function () { return ChitChatFactory_1.ChitChatFactory.getInstance().config; };
var getStore = function () { return ChitChatFactory_1.ChitChatFactory.getInstance().store; };
var authReducer = function () { return ChitChatFactory_1.ChitChatFactory.getInstance().authStore; };
exports.FETCH_PRIVATE_CHATROOM = "FETCH_PRIVATE_CHATROOM";
exports.FETCH_PRIVATE_CHATROOM_FAILURE = "FETCH_PRIVATE_CHATROOM_FAILURE";
exports.FETCH_PRIVATE_CHATROOM_SUCCESS = "FETCH_PRIVATE_CHATROOM_SUCCESS";
exports.FETCH_PRIVATE_CHATROOM_CANCELLED = "FETCH_PRIVATE_CHATROOM_CANCELLED";
exports.fetchPrivateChatRoom = function (ownerId, roommateId) { return ({ type: exports.FETCH_PRIVATE_CHATROOM, payload: { ownerId: ownerId, roommateId: roommateId } }); };
var fetchPrivateChatRoomSuccess = function (payload) { return ({ type: exports.FETCH_PRIVATE_CHATROOM_SUCCESS, payload: payload }); };
var cancelFetchPrivateChatRoom = function () { return ({ type: exports.FETCH_PRIVATE_CHATROOM_CANCELLED }); };
var fetchPrivateChatRoomFailure = function (payload) { return ({ type: exports.FETCH_PRIVATE_CHATROOM_FAILURE, payload: payload }); };
exports.getPrivateChatRoom_Epic = function (action$) {
    return action$.ofType(exports.FETCH_PRIVATE_CHATROOM)
        .mergeMap(function (action) { return fromPromise(chatroomService.getPrivateChatroom(action.payload.ownerId, action.payload.roommateId)); })
        .mergeMap(function (response) { return fromPromise(response.json()); })
        .map(function (json) {
        if (json.success) {
            return fetchPrivateChatRoomSuccess(json.result[0]);
        }
        else {
            return fetchPrivateChatRoomFailure(json.message);
        }
    })._do(function (x) {
        if (x.type === exports.FETCH_PRIVATE_CHATROOM_FAILURE) {
            console.warn("Need to create private chat room!");
        }
    })
        .takeUntil(action$.ofType(exports.FETCH_PRIVATE_CHATROOM_CANCELLED))
        .catch(function (error) { return Rx.Observable.of(fetchPrivateChatRoomFailure(error.message)); });
};
exports.CREATE_PRIVATE_CHATROOM = "CREATE_PRIVATE_CHATROOM";
exports.CREATE_PRIVATE_CHATROOM_SUCCESS = "CREATE_PRIVATE_CHATROOM_SUCCESS";
exports.CREATE_PRIVATE_CHATROOM_CANCELLED = "CREATE_PRIVATE_CHATROOM_CANCELLED";
exports.CREATE_PRIVATE_CHATROOM_FAILURE = "CREATE_PRIVATE_CHATROOM_FAILURE";
exports.createPrivateChatRoom = function (owner, roommate) { return ({ type: exports.CREATE_PRIVATE_CHATROOM, payload: { owner: owner, roommate: roommate } }); };
var createPrivateChatRoomSuccess = function (payload) { return ({ type: exports.CREATE_PRIVATE_CHATROOM_SUCCESS, payload: payload }); };
var createPrivateRoomCancelled = function () { return ({ type: exports.CREATE_PRIVATE_CHATROOM_CANCELLED }); };
var createPrivateChatRoomFailure = function (payload) { return ({ type: exports.CREATE_PRIVATE_CHATROOM_FAILURE, payload: payload }); };
exports.createPrivateChatRoomEpic = function (action$) {
    return action$.ofType(exports.CREATE_PRIVATE_CHATROOM)
        .mergeMap(function (action) { return ajax({
        method: "POST",
        url: getConfig().api.api + "/chatroom/private_chat/create",
        body: action.payload,
        headers: chitchatServiceUtils_1.chitchat_headers()
        // headers: {
        //     "Content-Type": "application/json",
        //     "x-access-token": authReducer().chitchat_token
        // }
    }); })
        .map(function (json) { return createPrivateChatRoomSuccess(json.response); })
        .takeUntil(action$.ofType(exports.CREATE_PRIVATE_CHATROOM_CANCELLED))
        .catch(function (error) { return Rx.Observable.of(createPrivateChatRoomFailure(error.xhr.response)); });
};
exports.GET_MY_ROOM = "GET_MY_ROOM";
exports.GET_MY_ROOM_SUCCESS = "GET_MY_ROOM_SUCCESS";
exports.GET_MY_ROOM_FAILURE = "GET_MY_ROOM_FAILURE";
exports.getMyRoom = redux_actions_1.createAction(exports.GET_MY_ROOM, function (user_id, username, avatar) { return ({ user_id: user_id, username: username, avatar: avatar }); });
exports.getMyRoomSuccess = redux_actions_1.createAction(exports.GET_MY_ROOM_SUCCESS, function (payload) { return payload; });
exports.getMyRoomFailure = redux_actions_1.createAction(exports.GET_MY_ROOM_FAILURE, function (error) { return error; });
exports.getMyRoomEpic = function (action$) {
    return action$.ofType(exports.GET_MY_ROOM)
        .mergeMap(function (action) { return ajax({
        method: "GET",
        url: getConfig().api.chatroom + "/myroom?user_id=" + action.payload.user_id + "&username=" + action.payload.username + "&avatar=" + action.payload.avatar,
        headers: chitchatServiceUtils_1.chitchat_headers()
    }); })
        .map(function (json) { return exports.getMyRoomSuccess(json.response.result[0]); })
        .catch(function (error) { return Rx.Observable.of(exports.getMyRoomFailure(error)); });
};
var GET_PERSISTEND_MESSAGE = "GET_PERSISTEND_MESSAGE";
var GET_PERSISTEND_MESSAGE_CANCELLED = "GET_PERSISTEND_MESSAGE_CANCELLED";
exports.GET_PERSISTEND_MESSAGE_SUCCESS = "GET_PERSISTEND_MESSAGE_SUCCESS";
var GET_PERSISTEND_MESSAGE_FAILURE = "GET_PERSISTEND_MESSAGE_FAILURE";
exports.getPersistendMessage = function (room_id) { return __awaiter(_this, void 0, void 0, function () {
    var result, ex_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                getStore().dispatch({ type: GET_PERSISTEND_MESSAGE, payload: room_id });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, ChatRoomComponent_1.ChatRoomComponent.getInstance().getPersistentMessage(room_id)];
            case 2:
                result = _a.sent();
                getStore().dispatch(getPersistendMessage_success(result));
                getStore().dispatch(chatroomActions_1.checkOlderMessages());
                getStore().dispatch(chatroomActions_1.getNewerMessageFromNet());
                return [3 /*break*/, 4];
            case 3:
                ex_1 = _a.sent();
                getStore().dispatch(getPersistendMessage_failure(ex_1.message));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var getPersistendMessage_cancel = function () { return ({ type: GET_PERSISTEND_MESSAGE_CANCELLED }); };
var getPersistendMessage_success = function (payload) { return ({ type: exports.GET_PERSISTEND_MESSAGE_SUCCESS, payload: payload }); };
var getPersistendMessage_failure = function (error) { return ({ type: GET_PERSISTEND_MESSAGE_FAILURE, payload: error }); };
exports.UPDATE_MESSAGES_READ = "UPDATE_MESSAGES_READ";
exports.UPDATE_MESSAGES_READ_SUCCESS = "UPDATE_MESSAGES_READ_SUCCESS";
exports.UPDATE_MESSAGES_READ_FAILUER = "UPDATE_MESSAGES_READ_FAILURE";
exports.updateMessagesRead = redux_actions_1.createAction(exports.UPDATE_MESSAGES_READ, function (messages, room_id) { return ({ messages: messages, room_id: room_id }); });
exports.updateMessagesRead_Success = redux_actions_1.createAction(exports.UPDATE_MESSAGES_READ_SUCCESS, function (payload) { return payload; });
exports.updateMessagesRead_Failure = redux_actions_1.createAction(exports.UPDATE_MESSAGES_READ_FAILUER, function (payload) { return payload; });
exports.updateMessagesRead_Epic = function (action$) {
    return action$.ofType(exports.UPDATE_MESSAGES_READ)
        .mergeMap(function (action) {
        var messages = action.payload.messages;
        var updates = messages.map(function (value) {
            if (value.sender !== authReducer().user._id) {
                return value._id;
            }
        });
        return MessageService_1.updateMessagesReader(updates, action.payload.room_id);
    })
        .mergeMap(function (response) { return response.json(); })
        .map(function (json) {
        if (json.success) {
            return exports.updateMessagesRead_Success(json);
        }
        else {
            return exports.updateMessagesRead_Failure(json.message);
        }
    })
        .catch(function (error) { return Rx.Observable.of(exports.updateMessagesRead_Failure(error)); });
};
exports.CHATROOM_UPLOAD_FILE = "CHATROOM_UPLOAD_FILE";
exports.CHATROOM_UPLOAD_FILE_SUCCESS = "CHATROOM_UPLOAD_FILE_SUCCESS";
exports.CHATROOM_UPLOAD_FILE_FAILURE = "CHATROOM_UPLOAD_FILE_FAILURE";
exports.CHATROOM_UPLOAD_FILE_CANCELLED = "CHATROOM_UPLOAD_FILE_CANCELLED";
exports.uploadFile = function (progressEvent, file) { return ({ type: exports.CHATROOM_UPLOAD_FILE, payload: { data: progressEvent, file: file } }); };
var uploadFileSuccess = function (result) {
    var payload = null;
    if (!!result.data) {
        payload = { path: "" + config.SS_REST.host + result.data.image };
    }
    return ({ type: exports.CHATROOM_UPLOAD_FILE_SUCCESS, payload: payload });
};
var uploadFileFailure = function (error) { return ({ type: exports.CHATROOM_UPLOAD_FILE_FAILURE, payload: error }); };
exports.uploadFileCanceled = function () { return ({ type: exports.CHATROOM_UPLOAD_FILE_CANCELLED }); };
exports.uploadFileEpic = function (action$) { return (action$.ofType(exports.CHATROOM_UPLOAD_FILE)
    .mergeMap(function (action) {
    var body = new FormData();
    body.append("file", action.payload.file);
    return ajax({
        method: "POST",
        url: "" + config.SS_REST.uploadChatFile,
        body: body,
        headers: {}
    });
})
    .map(function (json) { return uploadFileSuccess(json.response); })
    .takeUntil(action$.ofType(exports.CHATROOM_UPLOAD_FILE_CANCELLED))
    .catch(function (error) { return Rx.Observable.of(uploadFileFailure(error.xhr.response)); })); };
