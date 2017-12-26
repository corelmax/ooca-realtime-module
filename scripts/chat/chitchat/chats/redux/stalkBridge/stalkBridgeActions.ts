/**
 * Copyright 2016 Ahoo Studio.co.th.
 *
 * This is pure function action for redux app.
 */

import { createAction } from "redux-actions";

import { BackendFactory } from "../../BackendFactory";
import * as StalkNotificationAction from "./stalkNotificationActions";
import * as StalkPushActions from "./stalkPushActions";

import { StalkAccount, RoomAccessData } from "../../../shared/Stalk";

import { OnPushHandler, OnDataHandler } from "../../../actions/DataHandler";

import { ChitChatFactory } from "../../ChitChatFactory";
const getStore = () => ChitChatFactory.getInstance().store;

export const getSessionToken = () => {
    const backendFactory = BackendFactory.getInstance();
    return getStore().getState().stalkReducer.stalkToken;
};
const onGetContactProfileFail = (contact_id: string) => { };

export const STALK_INIT = "STALK_INIT";
export const STALK_INIT_SUCCESS = "STALK_INIT_SUCCESS";
export const STALK_INIT_FAILURE = "STALK_INIT_FAILURE";
const stalkInitFailure = createAction(STALK_INIT_FAILURE, (payload: string) => payload);

export const STALK_LOGOUT = "STALK_LOGOUT";
export const STALK_LOGOUT_SUCCESS = "STALK_LOGOUT_SUCCESS";
export const STALK_LOGOUT_FAILURE = "STALK_LOGOUT_FAILURE";
const stalkLogoutSuccess = createAction(STALK_LOGOUT_SUCCESS);

export function stalkLogin(user: StalkAccount) {
    if (getStore().getState().stalkReducer.isInit) {
        return;
    }

    getStore().dispatch({ type: STALK_INIT });

    const backendFactory = BackendFactory.createInstance();

    backendFactory.dataManager.addContactInfoFailEvents(onGetContactProfileFail);
    backendFactory.stalkInit().then(socket => {
        backendFactory.handshake(user._id).then((connector) => {
            backendFactory.checkIn(user).then((value) => {
                console.log("Joined stalk-service success", value);
                let result: { success: boolean, token: any } = JSON.parse(JSON.stringify(value.data));
                if (result.success) {
                    stalkManageConnection().then((server) => {
                        if (!!server) {
                            server.listenSocketEvents();
                            backendFactory.getServerListener();
                            backendFactory.subscriptions();
                            StalkNotificationAction.regisNotifyNewMessageEvent();
                            StalkPushActions.stalkPushInit(OnPushHandler);
                            backendFactory.dataListener.addUserEvents(OnDataHandler);

                            getStore().dispatch({
                                type: STALK_INIT_SUCCESS,
                                payload: { token: result.token, user: user }
                            });
                        } else {
                            console.warn("Stalk subscription fail: ");
                            getStore().dispatch({ type: STALK_INIT_FAILURE, payload: "Realtime service unavailable." });
                        }
                    }).catch(err => {
                        console.warn("Stalk subscription fail: ", err);
                        getStore().dispatch({ type: STALK_INIT_FAILURE, payload: err });
                    });
                }
                else {
                    console.warn("Joined chat-server fail: ", result);
                    getStore().dispatch({ type: STALK_INIT_FAILURE });
                }
            }).catch(err => {
                console.warn("Cannot checkIn", err);
                getStore().dispatch({ type: STALK_INIT_FAILURE });
            });
        }).catch(err => {
            console.warn("Hanshake fail: ", err);
            getStore().dispatch({ type: STALK_INIT_FAILURE });
        });
    }).catch(err => {
        console.log("StalkInit Fail.", err);
        getStore().dispatch(stalkInitFailure("Realtime service unavailable."));
    });
}

export const STALK_ON_SOCKET_RECONNECT = "STALK_ON_SOCKET_RECONNECT";
export const STALK_ON_SOCKET_CLOSE = "STALK_ON_SOCKET_CLOSE";
export const STALK_ON_SOCKET_DISCONNECTED = "STALK_ON_SOCKET_DISCONNECTED";
const onStalkSocketReconnect = (data: any) => ({ type: STALK_ON_SOCKET_RECONNECT, payload: data });
const onStalkSocketClose = (data: any) => ({ type: STALK_ON_SOCKET_CLOSE, payload: data });
const onStalkSocketDisconnected = (data: any) => ({ type: STALK_ON_SOCKET_DISCONNECTED, payload: data });
async function stalkManageConnection() {
    const backendFactory = BackendFactory.getInstance();

    let server = backendFactory.getServer();
    if (!!server) {
        server.onSocketReconnect = (data) => {
            getStore().dispatch(onStalkSocketReconnect(data.type));
        };
        server.onSocketClose = (data) => {
            getStore().dispatch(onStalkSocketClose("Connection closed"));
        };
        server.onDisconnected = (data) => {
            getStore().dispatch(onStalkSocketDisconnected("Connection disconnected"));
        };
    }

    return await server;
}

export async function stalkLogout() {
    const backendFactory = BackendFactory.getInstance();
    getStore().dispatch(stalkLogoutSuccess());
    return await backendFactory.logout();
}