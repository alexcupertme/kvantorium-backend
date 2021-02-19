"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const DatabaseHandler_1 = __importDefault(require("../models/DatabaseHandler"));
class AuthController {
    constructor() { }
    defaultMethod(clientRequest, callback) {
        DatabaseHandler_1.default.getUserInfoByLogin({
            login: clientRequest.body.login,
        }, (err, user) => {
            if (err)
                throw err;
            if (user) {
                DatabaseHandler_1.default.comparePass(clientRequest.body.password, user.password, (err, result) => {
                    if (err)
                        throw err;
                    return callback(result);
                });
            }
        });
    }
}
module.exports = new AuthController();
