"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const UserSchema_1 = __importDefault(require("./UserSchema"));
module.exports = function getUserInfo(query, callback) {
    let params = {
        login: query.login,
    };
    return UserSchema_1.default.findOne(params, callback);
};
