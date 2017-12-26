"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DataListener {
    constructor(dataManager) {
        this.onRoomAccessEventListeners = new Array();
        this.addOnRoomAccessListener = (listener) => {
            this.onRoomAccessEventListeners.push(listener);
        };
        this.removeOnRoomAccessListener = (listener) => {
            let id = this.onRoomAccessEventListeners.indexOf(listener);
            this.onRoomAccessEventListeners.splice(id, 1);
        };
        this.onUpdateRoomAccessEventListeners = new Array();
        this.addOnUpdateRoomAccessListener = (listener) => {
            this.onUpdateRoomAccessEventListeners.push(listener);
        };
        this.removeOnUpdateRoomAccessListener = (listener) => {
            let id = this.onUpdateRoomAccessEventListeners.indexOf(listener);
            this.onUpdateRoomAccessEventListeners.splice(id, 1);
        };
        this.onAddRoomAccessEventListeners = new Array();
        this.addOnAddRoomAccessListener = (listener) => {
            this.onAddRoomAccessEventListeners.push(listener);
        };
        this.removeOnAddRoomAccessListener = (listener) => {
            let id = this.onAddRoomAccessEventListeners.indexOf(listener);
            this.onAddRoomAccessEventListeners.splice(id, 1);
        };
        //#region User.
        this.userEventListeners = [];
        //#endregion
        //#region Ichatserver events.
        this.onChatEventListeners = new Array();
        this.onLeaveRoomListeners = new Array();
        this.dataManager = dataManager;
    }
    onAccessRoom(dataEvent) {
        if (Array.isArray(dataEvent) && dataEvent.length > 0) {
            let data = dataEvent[0];
            this.dataManager.setRoomAccessForUser(data);
            this.onRoomAccessEventListeners.map(listener => {
                listener(data);
            });
        }
    }
    onUpdatedLastAccessTime(dataEvent) {
        this.dataManager.updateRoomAccessForUser(dataEvent);
        this.onUpdateRoomAccessEventListeners.map(item => item(dataEvent));
    }
    onAddRoomAccess(dataEvent) {
        let datas = JSON.parse(JSON.stringify(dataEvent));
        if (!!datas[0].roomAccess && datas[0].roomAccess.length !== 0) {
            this.dataManager.setRoomAccessForUser(dataEvent);
        }
        this.onAddRoomAccessEventListeners.map(value => value(dataEvent));
    }
    addUserEvents(fx) {
        this.userEventListeners.push(fx);
    }
    removeUserEvents(fx) {
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
    addOnChatListener(listener) {
        this.onChatEventListeners.push(listener);
    }
    removeOnChatListener(listener) {
        let id = this.onChatEventListeners.indexOf(listener);
        this.onChatEventListeners.splice(id, 1);
    }
    // <!-- chat room data listener.
    onChat(data) {
        let chatMessageImp = data;
        this.onChatEventListeners.map((value, id, arr) => {
            value(chatMessageImp);
        });
    }
    ;
    addOnLeaveRoomListener(listener) {
        this.onLeaveRoomListeners.push(listener);
    }
    removeOnLeaveRoomListener(listener) {
        let id = this.onLeaveRoomListeners.indexOf(listener);
        this.onLeaveRoomListeners.splice(id, 1);
    }
    onLeaveRoom(data) {
        this.onLeaveRoomListeners.map(value => value(data));
    }
    ;
    onRoomJoin(data) {
    }
    ;
    //#endregion
    onGetMessagesReaders(dataEvent) {
        if (!!this.chatListenerImps && this.chatListenerImps.length !== 0) {
            this.chatListenerImps.forEach(value => {
                value.onGetMessagesReaders(dataEvent);
            });
        }
    }
    ;
}
exports.DataListener = DataListener;
