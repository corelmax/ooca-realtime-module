
import { DataEvent, StalkEvents, ChatEvents } from "stalk-js/lib/browser";
import { StalkAccount, RoomAccessData } from "../shared/Stalk";
import { IMessage } from "../shared/Message";
import { Room } from "./models/Room";

import { DataManager } from "./DataManager";

export class DataListener implements ChatEvents.IChatServerEvents, StalkEvents.IServerListener {
    private dataManager: DataManager;


    private onRoomAccessEventListeners = new Array<(data: StalkAccount) => void>();
    public addOnRoomAccessListener = (listener: (data: StalkAccount) => void) => {
        this.onRoomAccessEventListeners.push(listener);
    }
    public removeOnRoomAccessListener = (listener: (data) => void) => {
        let id = this.onRoomAccessEventListeners.indexOf(listener);
        this.onRoomAccessEventListeners.splice(id, 1);
    }


    private onUpdateRoomAccessEventListeners = new Array<(data: RoomAccessData) => void>();
    public addOnUpdateRoomAccessListener = (listener: (data: RoomAccessData) => void) => {
        this.onUpdateRoomAccessEventListeners.push(listener);
    }
    public removeOnUpdateRoomAccessListener = (listener: (data: RoomAccessData) => void) => {
        let id = this.onUpdateRoomAccessEventListeners.indexOf(listener);
        this.onUpdateRoomAccessEventListeners.splice(id, 1);
    }
    private onAddRoomAccessEventListeners = new Array();
    public addOnAddRoomAccessListener = (listener: (data) => void) => {
        this.onAddRoomAccessEventListeners.push(listener);
    }
    public removeOnAddRoomAccessListener = (listener: (data) => void) => {
        let id = this.onAddRoomAccessEventListeners.indexOf(listener);
        this.onAddRoomAccessEventListeners.splice(id, 1);
    }

    constructor(dataManager: DataManager) {
        this.dataManager = dataManager;
    }

    onAccessRoom(dataEvent: Array<any>) {
        if (Array.isArray(dataEvent) && dataEvent.length > 0) {
            let data = dataEvent[0] as StalkAccount;

            this.dataManager.setRoomAccessForUser(data);

            this.onRoomAccessEventListeners.map(listener => {
                listener(data);
            });
        }
    }

    onUpdatedLastAccessTime(dataEvent: RoomAccessData) {
        this.dataManager.updateRoomAccessForUser(dataEvent);

        this.onUpdateRoomAccessEventListeners.map(item => item(dataEvent));
    }

    onAddRoomAccess(dataEvent) {
        let datas: Array<StalkAccount> = JSON.parse(JSON.stringify(dataEvent));
        if (!!datas[0].roomAccess && datas[0].roomAccess.length !== 0) {
            this.dataManager.setRoomAccessForUser(dataEvent);
        }

        this.onAddRoomAccessEventListeners.map(value => value(dataEvent));
    }


    //#region User.

    public userEventListeners = [] as DataEvent[];
    public addUserEvents(fx: DataEvent) {
        this.userEventListeners.push(fx);
    }
    public removeUserEvents(fx: DataEvent) {
        let id = this.userEventListeners.indexOf(fx);
        this.userEventListeners.splice(id, 1);
    }

    onUserLogin(dataEvent) {
        console.log("user loged In", JSON.stringify(dataEvent));
        this.dataManager.onUserLogin(dataEvent);

        this.userEventListeners.map((fx) => {
            fx(dataEvent);
        });
    }
    onUserLogout(dataEvent) {
        console.log("user loged Out", JSON.stringify(dataEvent));
        this.userEventListeners.map((fx) => {
            fx(dataEvent);
        });
    }

    onUserUpdateImageProfile(dataEvent) {
        let jsonObj = JSON.parse(JSON.stringify(dataEvent));
        let _id = jsonObj._id;
        let path = jsonObj.path;

        this.dataManager.updateContactImage(_id, path);
    }

    onUserUpdateProfile(dataEvent) {
        let jsonobj = JSON.parse(JSON.stringify(dataEvent));
        let params = jsonobj.params;
        let _id = jsonobj._id;

        this.dataManager.updateContactProfile(_id, params);
    }

    //#endregion

    //#region Ichatserver events.

    private onChatEventListeners = new Array<(message: IMessage) => void>();
    public addOnChatListener(listener: (message: IMessage) => void) {
        this.onChatEventListeners.push(listener);
    }
    public removeOnChatListener(listener: (message: IMessage) => void) {
        let id = this.onChatEventListeners.indexOf(listener);
        this.onChatEventListeners.splice(id, 1);
    }

    // <!-- chat room data listener.
    onChat(data) {
        let chatMessageImp = data as IMessage;
        this.onChatEventListeners.map((value, id, arr) => {
            value(chatMessageImp);
        });
    };

    private onLeaveRoomListeners = new Array();
    public addOnLeaveRoomListener(listener: (message: IMessage) => void) {
        this.onLeaveRoomListeners.push(listener);
    }
    public removeOnLeaveRoomListener(listener: (message: IMessage) => void) {
        let id = this.onLeaveRoomListeners.indexOf(listener);
        this.onLeaveRoomListeners.splice(id, 1);
    }

    onLeaveRoom(data) {
        this.onLeaveRoomListeners.map(value => value(data));
    };

    onRoomJoin(data) {

    };

    //#endregion

    onGetMessagesReaders(dataEvent) {
        if (!!this.chatListenerImps && this.chatListenerImps.length !== 0) {
            this.chatListenerImps.forEach(value => {
                value.onGetMessagesReaders(dataEvent);
            });
        }
    };
}