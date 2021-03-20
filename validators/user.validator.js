"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GetQueryUserInfoDto = exports.LoginDto = exports.RegisterDto = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var LoginDto = /** @class */ (function () {
    function LoginDto() {
    }
    __decorate([
        class_transformer_1.Expose(),
        class_validator_1.Matches("(?=^.{8,30}$)(?=.*[0-9])(?=.*\\" + "W)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$") //prettier-ignore // @ts-ignore
    ], LoginDto.prototype, "password");
    __decorate([
        class_transformer_1.Expose(),
        class_validator_1.Length(3, 50)
    ], LoginDto.prototype, "login");
    return LoginDto;
}());
exports.LoginDto = LoginDto;
var RegisterDto = /** @class */ (function () {
    function RegisterDto() {
    }
    __decorate([
        class_transformer_1.Expose(),
        class_validator_1.Matches("(?=^.{8,30}$)(?=.*[0-9])(?=.*\\" + "W)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$") //prettier-ignore // @ts-ignore
    ], RegisterDto.prototype, "password");
    __decorate([
        class_validator_1.IsEmail(),
        class_transformer_1.Expose(),
        class_validator_1.Length(1, 50)
    ], RegisterDto.prototype, "mail");
    __decorate([
        class_validator_1.Length(3, 50),
        class_transformer_1.Expose()
    ], RegisterDto.prototype, "login");
    return RegisterDto;
}());
exports.RegisterDto = RegisterDto;
var GetQueryUserInfoDto = /** @class */ (function () {
    function GetQueryUserInfoDto() {
    }
    __decorate([
        class_validator_1.Length(3, 50),
        class_transformer_1.Expose(),
        class_validator_1.IsOptional()
    ], GetQueryUserInfoDto.prototype, "login");
    __decorate([
        class_validator_1.IsOptional(),
        class_transformer_1.Expose()
    ], GetQueryUserInfoDto.prototype, "name");
    __decorate([
        class_validator_1.IsOptional(),
        class_transformer_1.Expose()
    ], GetQueryUserInfoDto.prototype, "skills");
    __decorate([
        class_validator_1.IsOptional(),
        class_transformer_1.Expose()
    ], GetQueryUserInfoDto.prototype, "achievements");
    __decorate([
        class_validator_1.IsOptional(),
        class_transformer_1.Expose()
    ], GetQueryUserInfoDto.prototype, "kvantums");
    __decorate([
        class_validator_1.IsOptional(),
        class_transformer_1.Expose(),
        class_validator_1.Length(1, 5000)
    ], GetQueryUserInfoDto.prototype, "description");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.Length(1, 50),
        class_transformer_1.Expose()
    ], GetQueryUserInfoDto.prototype, "role");
    return GetQueryUserInfoDto;
}());
exports.GetQueryUserInfoDto = GetQueryUserInfoDto;
