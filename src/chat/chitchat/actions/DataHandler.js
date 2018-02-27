"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Chitchat_1 = require("../../Chitchat");
var getUsersPayload_1 = require("./users/getUsersPayload");
exports.OnPushHandler = function (data) {
    console.log("OnPushHandler", data);
    var getStore = function () { return Chitchat_1.chitchatFactory.getStore(); };
    if (data.event == "activeUser") {
        getUsersPayload_1.getUsersPayload().then(function (value) {
            console.log(value);
        }).catch(function (error) {
            console.warn(error);
        });
    }
};
exports.OnDataHandler = function (data) {
    console.log("OnDataHandler", data);
    getUsersPayload_1.getUsersPayload().then(function (value) {
        console.log(value);
    }).catch(function (error) {
        console.warn(error);
    });
};
exports.default = exports.OnDataHandler;
