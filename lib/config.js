"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var priv = {};
priv.conf = null;
var setConfig = function (config) {
    priv.conf = config;
};
exports.setConfig = setConfig;
var getConfig = function () {
    return priv.conf;
};
exports.getConfig = getConfig;
