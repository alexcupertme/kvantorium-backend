"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const UserSchema_1 = __importDefault(require("../../Interfaces/UserSchema"));
module.exports = function getQueryUserInfo(query, callback) {
    let params = {
        login: query.login,
    };
    UserSchema_1.default.findOne(params, (err, user) => {
        return callback(err, user);
    });
};
