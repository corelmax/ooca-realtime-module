"use strict";
/**
 * Copyright 2016 Ahoo Studio.co.th.
 *
 * This is pure function action for redux app.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = require("redux-actions");
var BackendFactory_1 = require("../../BackendFactory");
var StalkNotificationAction = __importStar(require("./stalkNotificationActions"));
var StalkPushActions = __importStar(require("./stalkPushActions"));
var DataHandler_1 = require("../../../actions/DataHandler");
var ChitChatFactory_1 = require("../../ChitChatFactory");
var getStore = function () { return ChitChatFactory_1.ChitChatFactory.getInstance().store; };
exports.getSessionToken = function () {
    var backendFactory = BackendFactory_1.BackendFactory.getInstance();
    return getStore().getState().stalkReducer.stalkToken;
};
var onGetContactProfileFail = function (contact_id) { };
exports.STALK_INIT = "STALK_INIT";
exports.STALK_INIT_SUCCESS = "STALK_INIT_SUCCESS";
exports.STALK_INIT_FAILURE = "STALK_INIT_FAILURE";
var stalkInitFailure = redux_actions_1.createAction(exports.STALK_INIT_FAILURE, function (payload) { return payload; });
exports.STALK_LOGOUT = "STALK_LOGOUT";
exports.STALK_LOGOUT_SUCCESS = "STALK_LOGOUT_SUCCESS";
exports.STALK_LOGOUT_FAILURE = "STALK_LOGOUT_FAILURE";
var stalkLogoutSuccess = redux_actions_1.createAction(exports.STALK_LOGOUT_SUCCESS);
function stalkLogin(user) {
    if (getStore().getState().stalkReducer.isInit) {
        return;
    }
    getStore().dispatch({ type: exports.STALK_INIT });
    var backendFactory = BackendFactory_1.BackendFactory.createInstance();
    backendFactory.dataManager.addContactInfoFailEvents(onGetContactProfileFail);
    backendFactory.stalkInit().then(function (socket) {
        backendFactory.handshake(user._id).then(function (connector) {
            backendFactory.checkIn(user).then(function (value) {
                console.log("Joined stalk-service success", value);
                var result = JSON.parse(JSON.stringify(value.data));
                if (result.success) {
                    stalkManageConnection().then(function (server) {
                        if (!!server) {
                            server.listenSocketEvents();
                            backendFactory.getServerListener();
                            backendFactory.subscriptions();
                            StalkNotificationAction.regisNotifyNewMessageEvent();
                            StalkPushActions.stalkPushInit(DataHandler_1.OnPushHandler);
                            backendFactory.dataListener.addUserEvents(DataHandler_1.OnDataHandler);
                            getStore().dispatch({
                                type: exports.STALK_INIT_SUCCESS,
                                payload: { token: result.token, user: user }
                            });
                        }
                        else {
                            console.warn("Stalk subscription fail: ");
                            getStore().dispatch({ type: exports.STALK_INIT_FAILURE, payload: "Realtime service unavailable." });
                        }
                    }).catch(function (err) {
                        console.warn("Stalk subscription fail: ", err);
                        getStore().dispatch({ type: exports.STALK_INIT_FAILURE, payload: err });
                    });
                }
                else {
                    console.warn("Joined chat-server fail: ", result);
                    getStore().dispatch({ type: exports.STALK_INIT_FAILURE });
                }
            }).catch(function (err) {
                console.warn("Cannot checkIn", err);
                getStore().dispatch({ type: exports.STALK_INIT_FAILURE });
            });
        }).catch(function (err) {
            console.warn("Hanshake fail: ", err);
            getStore().dispatch({ type: exports.STALK_INIT_FAILURE });
        });
    }).catch(function (err) {
        console.log("StalkInit Fail.", err);
        getStore().dispatch(stalkInitFailure("Realtime service unavailable."));
    });
}
exports.stalkLogin = stalkLogin;
exports.STALK_ON_SOCKET_RECONNECT = "STALK_ON_SOCKET_RECONNECT";
exports.STALK_ON_SOCKET_CLOSE = "STALK_ON_SOCKET_CLOSE";
exports.STALK_ON_SOCKET_DISCONNECTED = "STALK_ON_SOCKET_DISCONNECTED";
var onStalkSocketReconnect = function (data) { return ({ type: exports.STALK_ON_SOCKET_RECONNECT, payload: data }); };
var onStalkSocketClose = function (data) { return ({ type: exports.STALK_ON_SOCKET_CLOSE, payload: data }); };
var onStalkSocketDisconnected = function (data) { return ({ type: exports.STALK_ON_SOCKET_DISCONNECTED, payload: data }); };
function stalkManageConnection() {
    return __awaiter(this, void 0, void 0, function () {
        var backendFactory, server;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    backendFactory = BackendFactory_1.BackendFactory.getInstance();
                    server = backendFactory.getServer();
                    if (!!server) {
                        server.onSocketReconnect = function (data) {
                            getStore().dispatch(onStalkSocketReconnect(data.type));
                        };
                        server.onSocketClose = function (data) {
                            getStore().dispatch(onStalkSocketClose("Connection closed"));
                        };
                        server.onDisconnected = function (data) {
                            getStore().dispatch(onStalkSocketDisconnected("Connection disconnected"));
                        };
                    }
                    return [4 /*yield*/, server];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function stalkLogout() {
    return __awaiter(this, void 0, void 0, function () {
        var backendFactory;
        return __generator(this, function (_a) {
            getStore().dispatch(stalkLogoutSuccess());
            backendFactory = BackendFactory_1.BackendFactory.getInstance();
            if (backendFactory) {
                backendFactory.logout();
            }
            return [2 /*return*/, Promise.resolve()];
        });
    });
}
exports.stalkLogout = stalkLogout;
