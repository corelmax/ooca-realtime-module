"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var localForage = __importStar(require("localforage"));
var AppSessionToken = /** @class */ (function () {
    function AppSessionToken() {
        this.store = localForage.createInstance({
            name: "sessionToken"
        });
    }
    AppSessionToken.prototype.getSessionToken = function () {
        return this.store.getItem("sessionToken");
    };
    AppSessionToken.prototype.saveSessionToken = function (token) {
        return this.store.setItem("sessionToken", token);
    };
    AppSessionToken.prototype.deleteSessionToken = function () {
        this.store.removeItem("sessionToken");
    };
    return AppSessionToken;
}());
exports.AppSessionToken = AppSessionToken;
