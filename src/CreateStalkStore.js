"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var stalkReducer_1 = require("./chat/chitchat/chats/redux/stalkBridge/stalkReducer");
var UserReducer_1 = require("./chat/chitchat/actions/users/UserReducer");
/*
export function getInitialState() {
    const initState = {
        stalkReducer: new StalkInitState(),
        stalkUserReducer: new StalkUserState(),
    };
    return initState;
}
*/
var middlewares = [];
if (process.env.NODE_ENV === "development") {
    var logger = require("redux-logger").logger;
    middlewares.push(logger);
}
var reducer = redux_1.combineReducers({ stalkReducer: stalkReducer_1.stalkReducer, stalkUserReducer: UserReducer_1.stalkUserReducer });
exports.store = redux_1.compose(redux_1.applyMiddleware.apply(void 0, middlewares))(redux_1.createStore)(reducer);
// export default store;
