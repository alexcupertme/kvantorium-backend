"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class PostDto {
}
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.Length(1, 50),
    class_validator_1.IsIn(["video", "image", "text", "url", "separator"])
], PostDto.prototype, "type", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Expose()
], PostDto.prototype, "data", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Expose()
], PostDto.prototype, "cover", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Expose()
], PostDto.prototype, "anchor", void 0);
exports.PostDto = PostDto;
