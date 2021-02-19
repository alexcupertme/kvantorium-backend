"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const DatabaseHandler_1 = __importDefault(require("../models/DatabaseHandler"));
class QueryUserInfoController {
    constructor() { }
    defaultMethod(clientRequest, callback) {
        DatabaseHandler_1.default.getQueryUserInfo(clientRequest.body, (err, user) => {
            if (err)
                throw err;
            return callback(user);
        });
    }
}
module.exports = new QueryUserInfoController();
