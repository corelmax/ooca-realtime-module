"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_actions_1 = require("redux-actions");
const BackendFactory_1 = require("../../chats/BackendFactory");
const Chitchat_1 = require("../../../Chitchat");
const getConfig = () => Chitchat_1.chitchatFactory.config;
const store = () => Chitchat_1.chitchatFactory.getStore();
exports.FETCH_USERS_PAYLOAD = "FETCH_USERS_PAYLOAD";
const fetchUsersPayloadSuccess = redux_actions_1.createAction(exports.FETCH_USERS_PAYLOAD, payload => payload);
function getUsersPayload() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const backendFactory = BackendFactory_1.BackendFactory.getInstance();
            const server = backendFactory.getServer();
            const msg = {};
            msg["x-api-key"] = getConfig().Stalk.apiKey;
            msg["x-api-version"] = getConfig().Stalk.apiVersion;
            msg["x-app-id"] = getConfig().Stalk.appId;
            const result = yield server.getLobby().getUsersPayload(msg);
            if (result.code == 200) {
                store().dispatch(fetchUsersPayloadSuccess(result.data.value));
            }
            return result;
        }
        catch (ex) {
            return yield ex;
        }
    });
}
exports.getUsersPayload = getUsersPayload;
exports.default = getUsersPayload;
