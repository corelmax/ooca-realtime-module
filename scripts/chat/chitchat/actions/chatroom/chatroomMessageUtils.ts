
import { MessageType, IMessage } from "../../chitchat/shared/Message";
import { MessageImp } from "../../chitchat/chats/models/MessageImp";

// import { imagesPath } from "../../chitchat/consts/StickerPath";

import { chitchatFactory } from "../../Chitchat";
import { ChatRoomRecoder } from "../../chitchat/chats/redux/chatroom/";

import { UserRole } from "../../containers/utils/Role";
import { ChitChatFactory } from "../../chitchat/chats/ChitChatFactory";
import { Room } from "../../chitchat/chats/models/index";

const getStore = () => ChitChatFactory.getInstance().store;
const getAuth = () => ChitChatFactory.getInstance().authStore;

export interface IMessageDecorator {
    image?;
    text?;
    position?;
    video?;
    file?;
    sticker?;

    mimetype?;
    src?;
    size?;
}

export function decorateMessage(msg: IMessageDecorator): IMessage {
    let { chatroomReducer }: { chatroomReducer: ChatRoomRecoder } = getStore().getState();
    let { user } = getAuth();
    console.log(user);
    let { userid, fullName, picLink } = user;

    let message = new MessageImp();

    if (!!msg.image) {
        message.body = msg.image;
        message.src = msg.src;
        message.type = MessageType[MessageType.Image];
    }
    else if (!!msg.text) {
        message.body = msg.text;
        message.type = MessageType[MessageType.Text];
    }
    else if (!!msg.position) {
        message.body = msg.position;
        message.type = MessageType[MessageType.Location];
    }
    else if (!!msg.video) {
        message.body = msg.video;
        message.src = msg.src;
        message.type = MessageType[MessageType.Video];
    }
    else if (!!msg.file) {
        message.body = msg.file;
        message.meta = { mimetype: msg.mimetype, size: msg.size };
        message.src = msg.src;
        message.type = MessageType[MessageType.File];
    }
    // else if (msg.sticker != null) {
    //     message.body = msg.sticker;
    //     message.src = imagesPath[msg.sticker].img;
    //     message.type = MessageType[MessageType.Sticker];
    // }
    else {
        throw new Error("What the fuck!");
    }

    const room = chatroomReducer.get("room") as Room;

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

export const getDateTime = (time: Date) =>
    (`${time.getFullYear()}/${time.getMonth()}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}`);