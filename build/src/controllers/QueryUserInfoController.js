"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const QueryUserInfoModel_1 = __importDefault(require("../models/RouteModels/QueryUserInfoModel"));
class QueryUserInfoController {
    constructor() { }
    defaultMethod(clientRequest, callback) {
        let getUser = new QueryUserInfoModel_1.default(clientRequest);
        getUser.queryUserInfo((status, exitCode, data) => {
            return callback({ status, exitCode, data });
        });
    }
}
module.exports = new QueryUserInfoController();
