"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RegisterValidator_1 = __importDefault(require("../Methods/Validators/RegisterValidator"));
class RegisterHandler {
    constructor(clientData) {
        this.clientData = clientData.body;
    }
    /**
     * Registers a new user
     */
    register(callback) {
        let registerValidator = new RegisterValidator_1.default();
        registerValidator.login = this.clientData.login;
        registerValidator.mail = this.clientData.mail;
        registerValidator.password = this.clientData.password;
        registerValidator.validate(registerValidator, (errors) => {
            if (errors)
                return callback(0, `ERR_INCORRECT_${errors[0].toUpperCase()}`, null);
            else
                return callback(1, "SUCCESS", null);
        });
    }
}
exports.default = RegisterHandler;
