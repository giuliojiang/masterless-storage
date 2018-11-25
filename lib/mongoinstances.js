"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongo = __importStar(require("./mongo"));
var logger_1 = require("./util/logger");
var dateutil = __importStar(require("./util/dateutil"));
var logger = new logger_1.Logger("mongoinstances");
var INSTANCES_COLLECTION = "instances";
// <instanceid> new instance id. Should be a GUID string
// <return>     number of inserted documents
var addInstance = function (instanceid) {
    return __awaiter(this, void 0, void 0, function () {
        var currentTimeMillis, doc, collection, insertPromise, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentTimeMillis = dateutil.nowAsMillis();
                    doc = {
                        instanceid: instanceid,
                        timestamp: currentTimeMillis
                    };
                    return [4 /*yield*/, mongo.getCollection(INSTANCES_COLLECTION)];
                case 1:
                    collection = _a.sent();
                    insertPromise = new Promise(function (resolve, reject) {
                        collection.insertOne(doc, function (err, res) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(res);
                            }
                        });
                    });
                    return [4 /*yield*/, insertPromise];
                case 2:
                    res = _a.sent();
                    logger.info("Inserted " + res.insertedCount + " documents");
                    return [2 /*return*/, res.insertedCount];
            }
        });
    });
};
exports.addInstance = addInstance;
// Updates the timestamp to the current time
// <instanceid> instance id
// <return>     number of updated documents
var updateTimestamp = function (instanceid) {
    return __awaiter(this, void 0, void 0, function () {
        var currentTimeMillis, query, update, collection, updatePromise, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentTimeMillis = new Date().getTime();
                    query = {
                        instanceid: instanceid
                    };
                    update = {
                        $set: {
                            timestamp: currentTimeMillis
                        }
                    };
                    return [4 /*yield*/, mongo.getCollection(INSTANCES_COLLECTION)];
                case 1:
                    collection = _a.sent();
                    updatePromise = new Promise(function (resolve, reject) {
                        collection.updateOne(query, update, function (err, res) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(res);
                            }
                        });
                    });
                    return [4 /*yield*/, updatePromise];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result.modifiedCount];
            }
        });
    });
};
exports.updateTimestamp = updateTimestamp;
// Delete an instance by its ID
// <instanceid> instance id
// <return>     number of deleted documents
var removeInstance = function (instanceid) {
    return __awaiter(this, void 0, void 0, function () {
        var query, collection, deletePromise, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = {
                        instanceid: instanceid
                    };
                    return [4 /*yield*/, mongo.getCollection(INSTANCES_COLLECTION)];
                case 1:
                    collection = _a.sent();
                    deletePromise = new Promise(function (resolve, reject) {
                        collection.deleteMany(query, function (err, res) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(res);
                            }
                        });
                    });
                    return [4 /*yield*/, deletePromise];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result.deletedCount];
            }
        });
    });
};
exports.removeInstance = removeInstance;
