"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var priv = {};
priv.conf = null;
var setConfig = function (config) {
    priv.conf = config;
};
exports.setConfig = setConfig;
var getConfig = function () {
    if (priv.conf == null) {
        throw new Error("You have not set a configuration. Please use config.setConfig");
    }
    return priv.conf;
};
exports.getConfig = getConfig;
