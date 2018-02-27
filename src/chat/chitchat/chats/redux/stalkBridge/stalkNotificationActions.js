"use strict";
/**
 *  NotificationManager
 *
 * Copyright 2016 Ahoo Studio.co.th.
 *
 * The NotificationManager for react.js.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
var BackendFactory_1 = require("../../BackendFactory");
var Message_1 = require("../../../shared/Message");
var ChitChatFactory_1 = require("../../ChitChatFactory");
var getStore = function () { return ChitChatFactory_1.ChitChatFactory.getInstance().store; };
exports.STALK_NOTICE_NEW_MESSAGE = "STALK_NOTICE_NEW_MESSAGE";
var stalkNotiNewMessage = function (payload) { return ({ type: exports.STALK_NOTICE_NEW_MESSAGE, payload: payload }); };
var init = function (onSuccess) {
    console.log("Initialize NotificationManager.");
};
exports.regisNotifyNewMessageEvent = function () {
    console.log("subscribe global notify message event");
    BackendFactory_1.BackendFactory.getInstance().dataListener.addOnChatListener(exports.notify);
};
exports.unsubscribeGlobalNotifyMessageEvent = function () {
    BackendFactory_1.BackendFactory.getInstance().dataListener.removeOnChatListener(exports.notify);
};
exports.notify = function (messageImp) {
    var message = {
        title: messageImp.user.username,
        image: messageImp.user.avatar
    };
    if (messageImp.type === Message_1.MessageType[Message_1.MessageType.Text]) {
        message.body = messageImp.body;
        getStore().dispatch(stalkNotiNewMessage(message));
    }
    else {
        message.body = "Sent you " + messageImp.type.toLowerCase();
        getStore().dispatch(stalkNotiNewMessage(message));
    }
};
