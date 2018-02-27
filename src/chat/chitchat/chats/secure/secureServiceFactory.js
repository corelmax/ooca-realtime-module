"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodeSecureService_1 = require("./nodeSecureService");
/**
 * SecureServiceFactory
 */
var SecureServiceFactory = /** @class */ (function () {
    function SecureServiceFactory() {
    }
    SecureServiceFactory.createService = function (secret_key) {
        if (!SecureServiceFactory.service)
            SecureServiceFactory.service = new nodeSecureService_1.NodeSecureService(secret_key);
        return SecureServiceFactory.service;
    };
    SecureServiceFactory.getService = function () {
        return SecureServiceFactory.service;
    };
    return SecureServiceFactory;
}());
exports.SecureServiceFactory = SecureServiceFactory;
