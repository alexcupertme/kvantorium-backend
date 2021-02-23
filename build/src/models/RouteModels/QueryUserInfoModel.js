"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseHandler_1 = __importDefault(require("../DatabaseHandler"));
const QueryUserInfoValidator_1 = __importDefault(require("../Methods/Validators/QueryUserInfoValidator"));
const CheckToken_1 = __importDefault(require("../Methods/JWT/CheckToken"));
class AuthHandler {
    constructor(clientData) {
        this._clientData = clientData.body;
    }
    /**
     * Authenticate user with login and password
     */
    queryUserInfo(callback) {
        let regVal = new QueryUserInfoValidator_1.default();
        regVal.token = this._clientData.token;
        regVal.name = this._clientData.name;
        regVal.description = this._clientData.description;
        regVal.login = this._clientData.login;
        regVal.role = this._clientData.role;
        regVal.validate(regVal, (errors) => {
            if (errors)
                return callback(0, `ERR_INCORRECT_${errors[0].toUpperCase()}`, null);
            else {
                CheckToken_1.default(regVal.token, (isValid, decoded) => {
                    if (!isValid)
                        return callback(0, `ERR_TOKEN_EXPIRED`, null);
                    else {
                        DatabaseHandler_1.default.getUserInfoByLogin({ login: decoded.data }, (err, user) => {
                            if (err)
                                throw err;
                            if (!user)
                                return callback(0, `ERR_USER_BY_TOKEN_NOT_FOUND`, null);
                            else {
                                DatabaseHandler_1.default.getQueryUserInfo(regVal, (err, user) => {
                                    if (err)
                                        throw err;
                                    if (!user)
                                        return callback(0, `ERR_USERS_NOT_FOUND`, null);
                                    else
                                        return callback(1, `SUCCESS`, user);
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
