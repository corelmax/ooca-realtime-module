import { Push } from "../chats/PushDataListener";
import { chitchatFactory } from "../../Chitchat";
import { getUsersPayload } from "./users/getUsersPayload";

import { ON_USER_LOGIN, ON_USER_LOGOUT } from "./users/UserActions";

export const OnPushHandler = (data: Push) => {
    console.log("OnPushHandler", data);

    const getStore = () => chitchatFactory.getStore();

    if (data.event == "activeUser") {
        getUsersPayload().then(value => {
            console.log(value);
        }).catch(error => {
            console.warn(error);
        });
    }
};


export const OnDataHandler = (data) => {
    console.log("OnDataHandler", data);

    getUsersPayload().then(value => {
        console.log(value);
    }).catch(error => {
        console.warn(error);
    });
}

export default OnDataHandler;