import { History } from "history";
import { ChatRoomRecoder } from "./chitchat/chats/redux/chatroom/"
import { ChatLogRecorder } from "./chitchat/chats/redux/chatlogs/"

export interface IComponentProps {
    onError?: (error: string) => void;
    location: Location;
    adminReducer;
    AuthenReducer: IAuthenReducer;
    UserReducer: IUserReducer;
    chatroomReducer: ChatRoomRecoder;
    chatlogReducer: ChatLogRecorder;
    stalkReducer;
    teamReducer;
    groupReducer;
    alertReducer;
    dispatch;
    match: Match;
    history: History;
    staticContext;
}

export interface IAuthenReducer {
    user: {
        id: number;
        email: string;
        token: string;
        role_id: number;
        role_name: string;
    }
}

export class IUserReducer {
    isFetching: boolean;
    state: string;
    profile: {
        id: string;
        user_id: string;
        first_name: string;
        last_name: string;
        avatar: string;
    };
    account: any;
    social: any;
    error: string;
}

type Location = {
    hash;
    key;
    pathname;
    search;
    state;
};
type Match = {
    match;
    isExact;
    params;
    path;
    url;
};