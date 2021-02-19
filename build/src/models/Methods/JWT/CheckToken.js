"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const DatabaseConfig_1 = __importDefault(require("../../../config/DatabaseConfig"));
module.exports = function checkToken(token, callback) {
    jsonwebtoken_1.default.verify(token, DatabaseConfig_1.default.config.secretKey, function (err, decoded) {
        if (err) {
            return callback(false, null);
        }
        else
            return callback(true, decoded);
    });
};
