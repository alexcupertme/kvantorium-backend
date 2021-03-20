"use strict";
exports.__esModule = true;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var HttpException_1 = require("../exceptions/HttpException");
var MasterValidator = /** @class */ (function () {
    function MasterValidator() {
    }
    MasterValidator.prototype.validationMiddleware = function (type) {
        return function (req, res, next) {
            var filteredData = class_transformer_1.plainToClass(type, req.body, { excludeExtraneousValues: true });
            class_validator_1.validate(filteredData).then(function (errors) {
                if (errors.length > 0) {
                    next(new HttpException_1["default"](0, 400, "ERR_" + errors[0].property.toUpperCase() + "_INCORRECT"));
                }
                else {
                    for (var key in filteredData) {
                        if (filteredData[key] === undefined) {
                            delete filteredData[key];
                        }
                    }
                    req.body = filteredData;
                    next();
                }
            });
        };
    };
    return MasterValidator;
}());
var masterValidator = new MasterValidator();
exports["default"] = masterValidator.validationMiddleware;
