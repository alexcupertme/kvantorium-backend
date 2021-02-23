"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
class Validator {
    validate(register, callback) {
        class_validator_1.validate(register).then((errors) => {
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
__decorate([
    class_validator_1.Matches("(?=^.{8,30}$)(?=.*[0-9])(?=.*[!@#$%-^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$")
], Validator.prototype, "password", void 0);
__decorate([
    class_validator_1.IsEmail(),
    class_validator_1.Length(1, 50)
], Validator.prototype, "mail", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.Length(1, 30)
], Validator.prototype, "name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.Length(1, 30)
], Validator.prototype, "surname", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.Length(1, 5000)
], Validator.prototype, "description", void 0);
__decorate([
    class_validator_1.Length(3, 50)
], Validator.prototype, "login", void 0);
__decorate([
    class_validator_1.Length(1, 10),
    class_validator_1.IsOptional()
], Validator.prototype, "kvantumName", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional()
], Validator.prototype, "kvantumLevel", void 0);
__decorate([
    class_validator_1.Length(1, 50),
    class_validator_1.IsOptional()
], Validator.prototype, "skillName", void 0);
__decorate([
    class_validator_1.Length(1, 500),
    class_validator_1.IsOptional()
], Validator.prototype, "skillDescription", void 0);
exports.default = Validator;
