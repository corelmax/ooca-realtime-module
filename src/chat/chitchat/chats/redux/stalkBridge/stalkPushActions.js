"use strict";
/**
 * Copyright 2016 Ahoo Studio.co.th.
 *
 * This is pure function action for redux app.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const BackendFactory_1 = require("../../BackendFactory");
function stalkPushInit(onPushHandler) {
    const pushDataListener = BackendFactory_1.BackendFactory.getInstance().pushDataListener;
    pushDataListener.addPushEvents(onPushHandler);
}
exports.stalkPushInit = stalkPushInit;
