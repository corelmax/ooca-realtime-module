"use strict";
/**
 * Copyright 2016 Ahoo Studio.co.th.
 *
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const stalk_js_1 = require("stalk-js");
const DataManager_1 = require("./DataManager");
const DataListener_1 = require("./DataListener");
const PushDataListener_1 = require("./PushDataListener");
// import { ChatsLogComponent } from "./ChatslogComponent";
const ServerEventListener_1 = require("./ServerEventListener");
const ChitChatFactory_1 = require("./ChitChatFactory");
const getConfig = () => ChitChatFactory_1.ChitChatFactory.getInstance().config;
class BackendFactory {
    static getInstance() {
        return BackendFactory.instance;
    }
    static createInstance() {
        if (!BackendFactory.instance) {
            BackendFactory.instance = new BackendFactory();
        }
        return BackendFactory.instance;
    }
    // chatLogComp: ChatsLogComponent;
    constructor() {
        console.log("BackendFactory:");
        this.pushDataListener = new PushDataListener_1.PushDataListener();
        this.dataManager = new DataManager_1.DataManager();
        this.dataListener = new DataListener_1.DataListener(this.dataManager);
    }
    getServer() {
        if (this.stalk._isConnected) {
            return this.stalk;
        }
        else {
            console.log("Stalk connection not yet ready.");
            return null;
        }
    }
    stalkInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.stalk = stalk_js_1.stalkjs.create(getConfig().Stalk.chat, getConfig().Stalk.port);
            let socket = yield stalk_js_1.stalkjs.init(this.stalk);
            return socket;
        });
    }
    handshake(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ get connector server.
                let msg = {};
                msg.uid = uid;
                msg["x-api-key"] = getConfig().Stalk.apiKey;
                msg["x-api-version"] = getConfig().Stalk.apiVersion;
                msg["x-app-id"] = getConfig().Stalk.appId;
                const connector = yield stalk_js_1.stalkjs.geteEnter(this.stalk, msg);
                let params = { host: connector.host, port: connector.port, reconnect: false };
                yield stalk_js_1.stalkjs.handshake(this.stalk, params);
                return yield connector;
            }
            catch (ex) {
                throw new Error("handshake fail: " + ex.message);
            }
        });
    }
    checkIn(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = {};
            msg.user = user;
            msg["x-api-key"] = getConfig().Stalk.apiKey;
            msg["x-api-version"] = getConfig().Stalk.apiVersion;
            msg["x-app-id"] = getConfig().Stalk.appId;
            let result = yield stalk_js_1.stalkjs.checkIn(this.stalk, msg);
            return result;
        });
    }
    checkOut() {
        return __awaiter(this, void 0, void 0, function* () {
            yield stalk_js_1.stalkjs.checkOut(this.stalk);
        });
    }
    /**
     * @returns
     *
     * @memberof BackendFactory
     */
    logout() {
        const self = this;
        const promise = new Promise(function exe(resolve, reject) {
            self.checkOut();
            if (!!self.pushDataListener) {
                delete self.pushDataListener;
            }
            if (!!self.dataManager) {
                delete self.dataManager;
            }
            if (!!self.dataListener) {
                delete self.dataListener;
            }
            delete BackendFactory.instance;
            resolve();
        });
        return promise;
    }
    // createChatlogs() {
    //     this.chatLogComp = new ChatsLogComponent();
    //     return this.chatLogComp;
    // }
    getServerListener() {
        if (!this.serverEventsListener) {
            this.serverEventsListener = new ServerEventListener_1.ServerEventListener(this.stalk.getSocket());
        }
        return this.serverEventsListener;
    }
    subscriptions() {
        this.serverEventsListener.addServerListener(this.dataListener);
        this.serverEventsListener.addChatListener(this.dataListener);
        this.serverEventsListener.addPushListener(this.pushDataListener);
    }
}
exports.BackendFactory = BackendFactory;
