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
const MasterValidator_1 = __importDefault(require("../../MasterValidator"));
const post_validator_1 = require("../validators/post.validator");
class PostRouter {
    constructor() {
        this._router = express_1.default.Router();
        this._getPostById = (request, response, next) => __awaiter(this, void 0, void 0, function* () { });
        this._configure();
    }
    get router() {
        return this._router;
    }
    _configure() {
        this._router.post("/", MasterValidator_1.default.postValidationMiddleware(post_validator_1.PostDto), this._getPostById);
    }
}
module.exports = new PostRouter().router;
