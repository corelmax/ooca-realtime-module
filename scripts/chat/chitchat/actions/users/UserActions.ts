import { createAction } from "redux-actions";

export const ON_USER_LOGIN = "ON_USER_LOGIN";
export const ON_USER_LOGOUT = "ON_USER_LOGOUT";

export const onUserLogin = createAction(ON_USER_LOGIN, payload => payload);
export const onUserLogout = createAction(ON_USER_LOGOUT, payload => payload);