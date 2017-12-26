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
const secureServiceFactory_1 = require("../secure/secureServiceFactory");
const Message_1 = require("../../shared/Message");
const ChitChatFactory_1 = require("../ChitChatFactory");
const getConfig = () => ChitChatFactory_1.ChitChatFactory.getInstance().config;
exports.decryptionText = (message) => __awaiter(this, void 0, void 0, function* () {
    if (!message)
        return message;
    let secure = secureServiceFactory_1.SecureServiceFactory.getService();
    if (message.type === Message_1.MessageType[Message_1.MessageType.Text]) {
        if (getConfig().appConfig.encryption === true) {
            let result = yield secure.decryption(message.body);
            message.body = result;
            return message;
        }
        else {
            return message;
        }
    }
    else {
        return message;
    }
});
exports.hashComputation = (message) => {
    let secure = secureServiceFactory_1.SecureServiceFactory.getService();
    return secure.hashCompute(message);
};
