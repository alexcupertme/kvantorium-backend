"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetQueryUserInfoDto = exports.LoginDto = exports.RegisterDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class LoginDto {
}
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.Matches("(?=^.{8,30}$)(?=.*[0-9])(?=.*\\" + "W)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$") //prettier-ignore // @ts-ignore
], LoginDto.prototype, "password", void 0);
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.Length(3, 50)
], LoginDto.prototype, "login", void 0);
exports.LoginDto = LoginDto;
class RegisterDto {
}
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.Matches("(?=^.{8,30}$)(?=.*[0-9])(?=.*\\" + "W)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$") //prettier-ignore // @ts-ignore
], RegisterDto.prototype, "password", void 0);
__decorate([
    class_validator_1.IsEmail(),
    class_transformer_1.Expose(),
    class_validator_1.Length(1, 50)
], RegisterDto.prototype, "mail", void 0);
__decorate([
    class_validator_1.Length(3, 50),
    class_transformer_1.Expose()
], RegisterDto.prototype, "login", void 0);
exports.RegisterDto = RegisterDto;
class GetQueryUserInfoDto {
}
__decorate([
    class_validator_1.Length(3, 50),
    class_transformer_1.Expose(),
    class_validator_1.IsOptional()
], GetQueryUserInfoDto.prototype, "login", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Expose()
], GetQueryUserInfoDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Expose()
], GetQueryUserInfoDto.prototype, "skills", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Expose()
], GetQueryUserInfoDto.prototype, "achievements", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Expose()
], GetQueryUserInfoDto.prototype, "kvantums", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Expose(),
    class_validator_1.Length(1, 5000)
], GetQueryUserInfoDto.prototype, "description", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.Length(1, 50),
    class_transformer_1.Expose()
], GetQueryUserInfoDto.prototype, "role", void 0);
exports.GetQueryUserInfoDto = GetQueryUserInfoDto;
