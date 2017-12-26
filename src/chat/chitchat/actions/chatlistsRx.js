"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright 2017 Ahoo Studio.co.th.
 *
 * This is pure function action for redux app.
 */
const redux_actions_1 = require("redux-actions");
const Rx = require("rxjs/Rx");
const _1 = require("../chitchat/chats/redux/chatlogs/");
const ChitChatFactory_1 = require("../chitchat/chats/ChitChatFactory");
const chitchatServiceUtils_1 = require("../chitchat/chats/utils/chitchatServiceUtils");
const _2 = require("../chitchat/chats/");
const _3 = require("../chitchat/shared/");
const { ajax } = Rx.Observable;
const config = () => ChitChatFactory_1.ChitChatFactory.getInstance().config;
const getAuthStore = () => ChitChatFactory_1.ChitChatFactory.getInstance().authStore;
const getStore = () => ChitChatFactory_1.ChitChatFactory.getInstance().store;
// import Store from "../redux/configureStore";
const GET_ALL_CHATROOM = "GET_ALL_CHATROOM";
exports.GET_ALL_CHATROOM_SUCCESS = "GET_ALL_CHATROOM_SUCCESS";
exports.GET_ALL_CHATROOM_FAILURE = "GET_ALL_CHATROOM_FAILURE";
exports.getAllChatRoom = () => {
    return dispatch => {
        dispatch(getAllChatRoomRequest());
        let observable = ajax.get(`${config().api.chatroom}/all`, chitchatServiceUtils_1.chitchat_headers());
        observable.subscribe((x) => {
            dispatch(getAllChatRoomSuccess(x.response.result));
        }, error => {
            console.warn("error", error);
            dispatch(getAllChatRoomFailure(error));
        }, () => {
            console.log("done");
        });
    };
};
const getAllChatRoomRequest = redux_actions_1.createAction(GET_ALL_CHATROOM);
const getAllChatRoomSuccess = redux_actions_1.createAction(exports.GET_ALL_CHATROOM_SUCCESS, payload => payload);
const getAllChatRoomFailure = redux_actions_1.createAction(exports.GET_ALL_CHATROOM_FAILURE, error => error);
const GET_RECENT_MESSAGE = "GET_RECENT_MESSAGE";
exports.GET_RECENT_MESSAGE_SUCCESS = "GET_RECENT_MESSAGE_SUCCESS";
exports.GET_RECENT_MESSAGE_FAILURE = "GET_RECENT_MESSAGE_FAILURE";
const getRecentMessageSuccess = redux_actions_1.createAction(exports.GET_RECENT_MESSAGE_SUCCESS, payload => payload);
const getRecentMessageFailure = redux_actions_1.createAction(exports.GET_RECENT_MESSAGE_FAILURE, error => error);
exports.getRecentMessage_Epic = action$ => action$.filter(action => action.type === exports.GET_ALL_CHATROOM_SUCCESS || action.type === _1.ON_CHATLOG_CHANGE)
    .mergeMap(action => {
    let chatroomReducer = getStore().getState().chatroomReducer;
    let { roomAccess } = getStore().getState().chatlogReducer;
    let { id } = getAuthStore().user;
    let chatlogs = new Array();
    let rooms = chatroomReducer.get("chatrooms");
    let access = [];
    if (!!roomAccess)
        access = roomAccess.slice();
    rooms.map(item => {
        let has = access.some(acc => (acc.roomId === item._id));
        if (!has) {
            access.push(new _3.RoomAccessData(item._id, item.createTime));
        }
    });
    return Rx.Observable.fromPromise(new Promise((resolve, reject) => {
        Rx.Observable.from(access)
            .map((room) => __awaiter(this, void 0, void 0, function* () {
            let value = yield _2.getUnreadMessage(id, new _3.RoomAccessData(room.roomId, room.accessTime));
            let log = { rid: value.rid, count: value.count, lastMessage: value.message };
            return log;
        }))
            .flatMap(data => { return data; })
            .subscribe(log => {
            chatlogs.push(log);
        }, (err) => {
            reject(err);
        }, () => {
            resolve(chatlogs);
        });
    }));
})
    .map(response => getRecentMessageSuccess(response))
    .catch(error => { console.warn("errrrrrr", error); return Rx.Observable.of(getRecentMessageFailure(error)); });
exports.initChatlogs_Epic = action$ => action$.ofType(_1.STALK_INIT_CHATLOG)
    .mergeMap((action) => __awaiter(this, void 0, void 0, function* () {
    let { id } = getAuthStore().user;
    return yield id;
})).map(id => _1.getLastAccessRoom(id));
