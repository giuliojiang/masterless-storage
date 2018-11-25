"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stringNullOrWhitespace = function (s) {
    return s === null || s.match(/^ *$/) !== null;
};
exports.stringNullOrWhitespace = stringNullOrWhitespace;
