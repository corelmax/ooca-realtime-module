"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var immutable_1 = require("immutable");
var getUsersPayload_1 = require("./getUsersPayload");
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
var stalkUserInitState = new exports.StalkUserState();
function stalkUserReducer(state, action) {
    if (state === void 0) { state = stalkUserInitState; }
    switch (action.type) {
        case getUsersPayload_1.FETCH_USERS_PAYLOAD: {
            return state.set("users", action.payload);
        }
        default:
            return state;
    }
}
exports.stalkUserReducer = stalkUserReducer;
