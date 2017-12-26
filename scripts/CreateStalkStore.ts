import { combineReducers, createStore, applyMiddleware, compose } from "redux";

import { stalkReducer, StalkInitState } from "./chat/chitchat/chats/redux/stalkBridge/stalkReducer";
import { stalkUserReducer, StalkUserState } from "./chat/chitchat/actions/users/UserReducer";

/*
export function getInitialState() {
    const initState = {
        stalkReducer: new StalkInitState(),
        stalkUserReducer: new StalkUserState(),
    };
    return initState;
}
*/
const middlewares = [] as any[];

if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);
    middlewares.push(logger);
}
const reducer = combineReducers({ stalkReducer, stalkUserReducer });
export const store = compose(applyMiddleware(...middlewares))(createStore)(reducer);

// export default store;
