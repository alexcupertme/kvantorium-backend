"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const GetQueryUserInfo_1 = __importDefault(require("./Methods/DatabaseMethods/GetQueryUserInfo"));
const AddUser_1 = __importDefault(require("./Methods/DatabaseMethods/AddUser"));
const ComparePassword_1 = __importDefault(require("./Methods/DatabaseMethods/ComparePassword"));
const GetUserInfoByLogin_1 = __importDefault(require("./Methods/DatabaseMethods/GetUserInfoByLogin"));
class User {
    getQueryUserInfo(query, callback) {
        return GetQueryUserInfo_1.default(query, callback);
    }
    getUserInfoByLogin(query, callback) {
        return GetUserInfoByLogin_1.default(query, callback);
    }
    addUser(data, callback) {
        return AddUser_1.default(data, callback);
    }
    comparePass(passFromUser, userDBPass, callback) {
        return ComparePassword_1.default(passFromUser, userDBPass, callback);
    }
    constructor() { }
}
module.exports = new User();
