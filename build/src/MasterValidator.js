"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const exitCodes_config_1 = __importDefault(require("./config/exitCodes.config"));
const HttpException_1 = __importDefault(require("./models/HttpException"));
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
                    if (Object.keys(filteredData).length === 0)
                        next(new HttpException_1.default(0, 400, exitCodes_config_1.default.emptyField));
                    else
                        next();
                }
            });
        };
    }
    postValidationMiddleware(type) {
        return (req, res, next) => {
            let blocks = req.body.blocks;
            if (blocks !== undefined && blocks instanceof Array && blocks.length !== 0) {
                blocks.forEach((block) => {
                    if (!(block instanceof Object)) {
                        next(new HttpException_1.default(0, 400, exitCodes_config_1.default.emptyField));
                    }
                    else {
                        let filteredData = class_transformer_1.plainToClass(type, block, { excludeExtraneousValues: true });
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
                                console.log(filteredData);
                                if (Object.keys(filteredData).length === 0)
                                    next(new HttpException_1.default(0, 400, exitCodes_config_1.default.emptyField));
                                else
                                    next();
                            }
                        });
                    }
                });
            }
            else
                next(new HttpException_1.default(0, 400, exitCodes_config_1.default.emptyField));
        };
    }
}
let masterValidator = new MasterValidator();
exports.default = masterValidator;
