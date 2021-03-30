"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
module.exports = function unknownRoute(request, response, next) {
    next(new HttpException_1.default(0, 0, "This method does not exists!"));
};
