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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HttpException_1 = __importDefault(require("../../models/HttpException"));
const ResponseSchema_1 = __importDefault(require("../../models/ResponseSchema"));
const token_config_1 = __importDefault(require("../../config/token.config"));
const exitCodes_config_1 = __importDefault(require("../../config/exitCodes.config"));
const user_model_1 = __importDefault(require("../models/user.model"));
class GetMyInfoRouter {
    constructor() {
        this._router = express_1.default.Router();
        this._getMyInfo = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const userData = (yield jsonwebtoken_1.default.verify(request.cookies.Authorization, token_config_1.default.config.secretKey));
            const uuid = userData._id;
            yield user_model_1.default.findOne({ id: uuid }, (err, user) => __awaiter(this, void 0, void 0, function* () {
                if (!user)
                    next(new HttpException_1.default(0, 200, exitCodes_config_1.default.userNotFound));
                else {
                    let resData = {
                        login: user.login,
                        name: user.name,
                        skills: user.skills,
                        achievements: user.achievements,
                        kvantums: user.kvantums,
                        description: user.description,
                        role: user.role,
                        registerDate: user.registerDate,
                    };
                    response.send(new ResponseSchema_1.default(request.originalUrl, resData, 1, exitCodes_config_1.default.success));
                }
            }));
        });
        this._configure();
    }
    get router() {
        return this._router;
    }
    _configure() {
        this._router.post("/", this._getMyInfo);
    }
}
module.exports = new GetMyInfoRouter().router;
