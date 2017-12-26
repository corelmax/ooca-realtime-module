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
const BackendFactory_1 = require("../../BackendFactory");
const Message_1 = require("../../../shared/Message");
const ChitChatFactory_1 = require("../../ChitChatFactory");
const getStore = () => ChitChatFactory_1.ChitChatFactory.getInstance().store;
exports.STALK_NOTICE_NEW_MESSAGE = "STALK_NOTICE_NEW_MESSAGE";
const stalkNotiNewMessage = (payload) => ({ type: exports.STALK_NOTICE_NEW_MESSAGE, payload });
const init = (onSuccess) => {
    console.log("Initialize NotificationManager.");
};
exports.regisNotifyNewMessageEvent = () => {
    console.log("subscribe global notify message event");
    BackendFactory_1.BackendFactory.getInstance().dataListener.addOnChatListener(exports.notify);
};
exports.unsubscribeGlobalNotifyMessageEvent = () => {
    BackendFactory_1.BackendFactory.getInstance().dataListener.removeOnChatListener(exports.notify);
};
exports.notify = (messageImp) => {
    let message = {
        title: messageImp.user.username,
        image: messageImp.user.avatar
    };
    if (messageImp.type === Message_1.MessageType[Message_1.MessageType.Text]) {
        message.body = messageImp.body;
        getStore().dispatch(stalkNotiNewMessage(message));
    }
    else {
        message.body = `Sent you ${messageImp.type.toLowerCase()}`;
        getStore().dispatch(stalkNotiNewMessage(message));
    }
};
