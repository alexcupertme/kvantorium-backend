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
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const MasterValidator_1 = __importDefault(require("../validators/MasterValidator"));
const ResponseSchema_1 = __importDefault(require("../exceptions/ResponseSchema"));
const user_validator_1 = require("../validators/user.validator");
const user_model_1 = __importDefault(require("../models/user.model"));
class GetUserInfoRouter {
    constructor() {
        this._router = express_1.default.Router();
        this._getUserInfo = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const userData = request.body;
            yield user_model_1.default.find(userData, (err, user) => __awaiter(this, void 0, void 0, function* () {
                if (!user)
                    next(new HttpException_1.default(0, 400, "ERR_USER_NOT_FOUND"));
                else {
                    let resData = [];
                    user.forEach((element) => {
                        let resItem = {
                            login: element.login,
                            name: element.name,
                            skills: element.skills,
                            achievements: element.achievements,
                            kvantums: element.kvantums,
                            description: element.description,
                            role: element.role,
                        };
                        resData.push(resItem);
                    });
                    response.send(new ResponseSchema_1.default(request.originalUrl, resData, 1, "Success!"));
                }
            }));
        });
        this._configure();
    }
    get router() {
        return this._router;
    }
    _configure() {
        this._router.post("/", MasterValidator_1.default(user_validator_1.GetQueryUserInfoDto), this._getUserInfo);
    }
}
module.exports = new GetUserInfoRouter().router;
