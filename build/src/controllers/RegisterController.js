"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const RegisterModel_1 = __importDefault(require("../models/RouteModels/RegisterModel"));
class RegisterController {
    constructor() { }
    defaultMethod(clientRequest, callback) {
        let register = new RegisterModel_1.default(clientRequest);
        register.register((status, exitCode, data) => {
            return callback({ status, exitCode, data });
        });
    }
}
module.exports = new RegisterController();
