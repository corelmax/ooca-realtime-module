"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Chitchat_1 = require("../../Chitchat");
const getUsersPayload_1 = require("./users/getUsersPayload");
exports.OnPushHandler = (data) => {
    console.log("OnPushHandler", data);
    const getStore = () => Chitchat_1.chitchatFactory.getStore();
    if (data.event == "activeUser") {
        getUsersPayload_1.getUsersPayload().then(value => {
            console.log(value);
        }).catch(error => {
            console.warn(error);
        });
    }
};
exports.OnDataHandler = (data) => {
    console.log("OnDataHandler", data);
    getUsersPayload_1.getUsersPayload().then(value => {
        console.log(value);
    }).catch(error => {
        console.warn(error);
    });
};
exports.default = exports.OnDataHandler;
