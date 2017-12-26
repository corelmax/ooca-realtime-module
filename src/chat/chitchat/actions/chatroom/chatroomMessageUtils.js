"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = require("../../chitchat/shared/Message");
const MessageImp_1 = require("../../chitchat/chats/models/MessageImp");
const ChitChatFactory_1 = require("../../chitchat/chats/ChitChatFactory");
const getStore = () => ChitChatFactory_1.ChitChatFactory.getInstance().store;
const getAuth = () => ChitChatFactory_1.ChitChatFactory.getInstance().authStore;
function decorateMessage(msg) {
    let { chatroomReducer } = getStore().getState();
    let { user } = getAuth();
    console.log(user);
    let { userid, fullName, picLink } = user;
    let message = new MessageImp_1.MessageImp();
    if (!!msg.image) {
        message.body = msg.image;
        message.src = msg.src;
        message.type = Message_1.MessageType[Message_1.MessageType.Image];
    }
    else if (!!msg.text) {
        message.body = msg.text;
        message.type = Message_1.MessageType[Message_1.MessageType.Text];
    }
    else if (!!msg.position) {
        message.body = msg.position;
        message.type = Message_1.MessageType[Message_1.MessageType.Location];
    }
    else if (!!msg.video) {
        message.body = msg.video;
        message.src = msg.src;
        message.type = Message_1.MessageType[Message_1.MessageType.Video];
    }
    else if (!!msg.file) {
        message.body = msg.file;
        message.meta = { mimetype: msg.mimetype, size: msg.size };
        message.src = msg.src;
        message.type = Message_1.MessageType[Message_1.MessageType.File];
    }
    else {
        throw new Error("What the fuck!");
    }
    const room = chatroomReducer.get("room");
    message.rid = room._id;
    message.sender = userid;
    message.user = {
        _id: userid,
        username: `${fullName}`,
        avatar: picLink
    };
    message.target = chatroomReducer.get("chatTargets");
    message.uuid = Math.round(Math.random() * 10000).toString(); // simulating server-side unique id generation
    message.status = "Sending...";
    return message;
}
exports.decorateMessage = decorateMessage;
exports.getDateTime = (time) => (`${time.getFullYear()}/${time.getMonth()}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}`);
