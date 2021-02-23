"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const AuthModel_1 = __importDefault(require("../models/RouteModels/AuthModel"));
class AuthController {
    constructor() { }
    defaultMethod(clientRequest, callback) {
        let authModel = new AuthModel_1.default(clientRequest);
        authModel.auth((status, exitCode, data) => {
            return callback({ status, exitCode, data });
        });
    }
}
module.exports = new AuthController();
