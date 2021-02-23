"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseHandler_1 = __importDefault(require("../DatabaseHandler"));
const AuthValidator_1 = __importDefault(require("../Methods/Validators/AuthValidator"));
const SignToken_1 = __importDefault(require("../Methods/JWT/SignToken"));
class AuthHandler {
    constructor(clientData) {
        this._clientData = clientData.body;
    }
    /**
     * Authenticate user with login and password
     */
    auth(callback) {
        let regVal = new AuthValidator_1.default();
        regVal.login = this._clientData.login;
        regVal.password = this._clientData.password;
        regVal.validate(regVal, (errors) => {
            if (errors)
                return callback(0, `ERR_INCORRECT_${errors[0].toUpperCase()}`, null);
            else {
                DatabaseHandler_1.default.getUserInfoByLogin({ login: regVal.login }, (err, user) => {
                    if (err)
                        throw err;
                    if (!user)
                        return callback(0, `ERR_USER_NOT_FOUND`, null);
                    else {
                        DatabaseHandler_1.default.comparePass(regVal.password, user.password, (err, isMatch) => {
                            if (err)
                                throw err;
                            if (!isMatch)
                                return callback(0, `ERR_PASSWORD_NOT_MATCH`, null);
                            else {
                                SignToken_1.default(user.login, (token) => {
                                    return callback(1, `SUCCESS`, { token });
                                });
                            }
                        });
                    }
                });
            }
        });
    }
}
exports.default = AuthHandler;
