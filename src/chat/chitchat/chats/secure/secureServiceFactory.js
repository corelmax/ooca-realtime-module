"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodeSecureService_1 = require("./nodeSecureService");
/**
 * SecureServiceFactory
 */
class SecureServiceFactory {
    static createService(secret_key) {
        if (!SecureServiceFactory.service)
            SecureServiceFactory.service = new nodeSecureService_1.NodeSecureService(secret_key);
        return SecureServiceFactory.service;
    }
    static getService() {
        return SecureServiceFactory.service;
    }
}
exports.SecureServiceFactory = SecureServiceFactory;
