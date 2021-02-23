"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
class Validator {
    constructor() { }
    validate(token, callback) {
        class_validator_1.validate(token).then((errors) => {
            if (errors.length > 0) {
                let errorArr = [];
                errors.forEach((error) => {
                    errorArr.push(error.property);
                });
                return callback(errorArr);
            }
            else {
                return callback();
            }
        });
    }
}
exports.default = Validator;
