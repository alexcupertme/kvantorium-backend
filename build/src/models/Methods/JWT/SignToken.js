"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const DatabaseConfig_1 = __importDefault(require("../../../config/DatabaseConfig"));
module.exports = function signToken(data, callback) {
    const token = jsonwebtoken_1.default.sign({
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: data,
    }, DatabaseConfig_1.default.config.secretKey);
    return callback(token);
};
