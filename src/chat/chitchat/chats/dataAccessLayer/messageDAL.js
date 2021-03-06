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
var MessageDAL = /** @class */ (function () {
    function MessageDAL() {
        // localforage.config({
        //     driver: localforage.WEBSQL, // Force WebSQL; same as using setDriver()
        //     name: 'myApp',
        //     version: 1.0,
        //     size: 4980736, // Size of database, in bytes. WebSQL-only for now.
        //     storeName: 'keyvaluepairs', // Should be alphanumeric, with underscores.
        //     description: 'some description'
        // });
        this.store = localForage.createInstance({
            name: "message"
        });
    }
    MessageDAL.prototype.getData = function (rid) {
        return this.store.getItem(rid);
    };
    MessageDAL.prototype.saveData = function (rid, chatRecord) {
        return this.store.setItem(rid, chatRecord);
    };
    MessageDAL.prototype.removeData = function (rid, callback) {
        this.store.removeItem(rid).then(function () {
            console.info("room_id %s is removed: ", rid);
            if (callback) {
                callback(null, null);
            }
        }).catch(function (err) {
            console.warn(err);
        });
    };
    MessageDAL.prototype.clearData = function (next) {
        console.warn("MessageDAL.clearData");
        this.store.clear(function (err) {
            if (err != null) {
                console.warn("Clear database fail", err);
            }
            console.warn("message db now empty.");
            next(err);
        });
    };
    return MessageDAL;
}());
exports.MessageDAL = MessageDAL;
