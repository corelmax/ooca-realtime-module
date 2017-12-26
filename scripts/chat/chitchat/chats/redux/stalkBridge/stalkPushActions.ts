/**
 * Copyright 2016 Ahoo Studio.co.th.
 *
 * This is pure function action for redux app.
 */

import { BackendFactory } from "../../BackendFactory";
import { Push } from "../../PushDataListener";

export function stalkPushInit(onPushHandler: (dataEvent: Push) => void) {
    const pushDataListener = BackendFactory.getInstance().pushDataListener;
    pushDataListener.addPushEvents(onPushHandler);
}
