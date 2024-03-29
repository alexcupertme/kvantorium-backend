"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordDto = exports.ChangeMyInfoDto = exports.GetUserInfoDto = exports.LoginDto = exports.RegisterDto = void 0;
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
class GetUserInfoDto {
}
__decorate([
    class_validator_1.Length(3, 50),
    class_transformer_1.Expose(),
    class_validator_1.IsOptional()
], GetUserInfoDto.prototype, "login", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.MaxLength(30),
    class_transformer_1.Expose()
], GetUserInfoDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Expose()
], GetUserInfoDto.prototype, "kvantums", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Expose()
], GetUserInfoDto.prototype, "achievements", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Expose(),
    class_validator_1.Length(1, 5000)
], GetUserInfoDto.prototype, "description", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.Length(1, 50),
    class_transformer_1.Expose()
], GetUserInfoDto.prototype, "role", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.Length(1, 50),
    class_transformer_1.Expose()
], GetUserInfoDto.prototype, "registerDate", void 0);
exports.GetUserInfoDto = GetUserInfoDto;
class ChangeMyInfoDto {
}
__decorate([
    class_validator_1.Length(3, 50),
    class_transformer_1.Expose(),
    class_validator_1.IsOptional()
], ChangeMyInfoDto.prototype, "login", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.MaxLength(30),
    class_transformer_1.Expose()
], ChangeMyInfoDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsEmail(),
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.Length(1, 50)
], ChangeMyInfoDto.prototype, "mail", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Expose()
], ChangeMyInfoDto.prototype, "skills", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Expose()
], ChangeMyInfoDto.prototype, "kvantums", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Expose(),
    class_validator_1.Length(1, 5000)
], ChangeMyInfoDto.prototype, "description", void 0);
exports.ChangeMyInfoDto = ChangeMyInfoDto;
class ChangePasswordDto {
}
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.Matches("(?=^.{8,30}$)(?=.*[0-9])(?=.*\\" + "W)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$") //prettier-ignore // @ts-ignore
], ChangePasswordDto.prototype, "oldPassword", void 0);
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.Matches("(?=^.{8,30}$)(?=.*[0-9])(?=.*\\" + "W)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$") //prettier-ignore // @ts-ignore
], ChangePasswordDto.prototype, "password", void 0);
exports.ChangePasswordDto = ChangePasswordDto;
