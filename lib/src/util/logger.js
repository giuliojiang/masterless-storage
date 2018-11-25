"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Logger = /** @class */ (function () {
    function Logger(name) {
        this.name = name;
    }
    Logger.prototype.info = function (msg) {
        console.info(this.name + ": " + msg);
    };
    Logger.prototype.error = function (msg) {
        console.error(this.name + ": " + msg);
    };
    return Logger;
}());
exports.Logger = Logger;
