"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const ErrorHandler_1 = __importDefault(require("../models/ErrorHandler"));
class ThemeAController {
    defaultMethod() {
        throw new ErrorHandler_1.default(501, 'Not implemented method');
    }
}
module.exports = new ThemeAController();
