"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../chitchat/shared/Message");
var MessageImp_1 = require("../../chitchat/chats/models/MessageImp");
var ChitChatFactory_1 = require("../../chitchat/chats/ChitChatFactory");
var getStore = function () { return ChitChatFactory_1.ChitChatFactory.getInstance().store; };
var getAuth = function () { return ChitChatFactory_1.ChitChatFactory.getInstance().authStore; };
function decorateMessage(msg) {
    var chatroomReducer = getStore().getState().chatroomReducer;
    var user = getAuth().user;
    console.log(user);
    var userid = user.userid, fullName = user.fullName, picLink = user.picLink;
    var message = new MessageImp_1.MessageImp();
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
    var room = chatroomReducer.get("room");
    message.rid = room._id;
    message.sender = userid;
    message.user = {
        _id: userid,
        username: "" + fullName,
        avatar: picLink
    };
    message.target = chatroomReducer.get("chatTargets");
    message.uuid = Math.round(Math.random() * 10000).toString(); // simulating server-side unique id generation
    message.status = "Sending...";
    return message;
}
exports.decorateMessage = decorateMessage;
exports.getDateTime = function (time) {
    return (time.getFullYear() + "/" + time.getMonth() + "/" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes());
};
