"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
class LoginDto {
}
__decorate([
    class_validator_1.Matches("(?=^.{8,30}$)(?=.*[0-9])(?=.*\\" + "W)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$") //prettier-ignore // @ts-ignore
], LoginDto.prototype, "password", void 0);
__decorate([
    class_validator_1.Length(3, 50)
], LoginDto.prototype, "login", void 0);
class RegisterDto {
}
__decorate([
    class_validator_1.Matches("(?=^.{8,30}$)(?=.*[0-9])(?=.*\\" + "W)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$") //prettier-ignore // @ts-ignore
], RegisterDto.prototype, "password", void 0);
__decorate([
    class_validator_1.IsEmail(),
    class_validator_1.Length(1, 50)
], RegisterDto.prototype, "mail", void 0);
__decorate([
    class_validator_1.Length(3, 50)
], RegisterDto.prototype, "login", void 0);
exports.default = { RegisterDto, LoginDto };
