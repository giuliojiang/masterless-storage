"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config = /** @class */ (function () {
    function Config() {
        this.mongoConnectionString = "mongodb+srv://USER:PASS@URL/test?retryWrites=true";
        this.mongoDatabaseName = "test";
        this.mongoCollectionName = "masterless-storage";
    }
    return Config;
}());
var config = new Config();
exports.config = config;
