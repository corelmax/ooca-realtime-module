"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
const getUsersPayload_1 = require("./getUsersPayload");
/**
 * ## Initial State
 */
/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 */
exports.StalkUserState = immutable_1.Record({
    isFetching: false,
    users: null,
    error: "",
});
const stalkUserInitState = new exports.StalkUserState();
function stalkUserReducer(state = stalkUserInitState, action) {
    switch (action.type) {
        case getUsersPayload_1.FETCH_USERS_PAYLOAD: {
            return state.set("users", action.payload);
        }
        default:
            return state;
    }
}
exports.stalkUserReducer = stalkUserReducer;
