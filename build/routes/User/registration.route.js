"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const HttpException_1 = __importDefault(require("../../exceptions/HttpException"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const ResponseSchema_1 = __importDefault(require("../../exceptions/ResponseSchema"));
class UserRouter {
    constructor() {
        this._router = express_1.default.Router();
        this._subAction = ".registration";
        this._registration = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const action = `${this._action}.registration`;
            const userData = request.body;
            yield user_model_1.default.findOne({ login: userData.login }, {}, {}, (err, user) => __awaiter(this, void 0, void 0, function* () {
                if (user)
                    next(new HttpException_1.default(0, 400, "ERR_NICKNAME_WAS_TAKEN"));
                else {
                    const hashedPassword = yield bcrypt_1.default.hash(userData.password, 10);
                    const user = yield user_model_1.default.create(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
                    user.password = undefined;
                    response.send(new ResponseSchema_1.default(action, 0, 1, "Success!"));
                }
            }));
        });
    }
    get router() {
        return this._router;
    }
}
module.exports = new UserRouter().router;
