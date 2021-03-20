"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
class MasterValidator {
    validationMiddleware(type) {
        return (req, res, next) => {
            let filteredData = class_transformer_1.plainToClass(type, req.body, { excludeExtraneousValues: true });
            class_validator_1.validate(filteredData).then((errors) => {
                if (errors.length > 0) {
                    next(new HttpException_1.default(0, 400, `ERR_${errors[0].property.toUpperCase()}_INCORRECT`));
                }
                else {
                    for (let key in filteredData) {
                        if (filteredData[key] === undefined) {
                            delete filteredData[key];
                        }
                    }
                    req.body = filteredData;
                    next();
                }
            });
        };
    }
}
let masterValidator = new MasterValidator();
exports.default = masterValidator.validationMiddleware;
