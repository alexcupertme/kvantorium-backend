"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostURLDto = exports.PostVideoDto = exports.PostImageDto = exports.PostTextDto = exports.PostDto = void 0;
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
    class_transformer_1.Expose(),
    class_validator_1.IsObject()
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
class PostTextDto {
}
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.Length(1, 5000)
], PostTextDto.prototype, "text", void 0);
exports.PostTextDto = PostTextDto;
class PostImageDto {
}
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.Length(1, 100)
], PostImageDto.prototype, "title", void 0);
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.Length(1, 100)
], PostImageDto.prototype, "author", void 0);
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.Length(1, 500),
    class_validator_1.IsUrl()
], PostImageDto.prototype, "src", void 0);
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsInt(),
    class_validator_1.Min(100),
    class_validator_1.Max(4000)
], PostImageDto.prototype, "width", void 0);
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsInt(),
    class_validator_1.Min(100),
    class_validator_1.Max(4000)
], PostImageDto.prototype, "height", void 0);
exports.PostImageDto = PostImageDto;
class PostVideoDto {
}
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.Length(1, 500),
    class_validator_1.IsUrl()
], PostVideoDto.prototype, "src", void 0);
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsInt(),
    class_validator_1.Min(100),
    class_validator_1.Max(4000)
], PostVideoDto.prototype, "width", void 0);
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsInt(),
    class_validator_1.Min(100),
    class_validator_1.Max(4000)
], PostVideoDto.prototype, "height", void 0);
exports.PostVideoDto = PostVideoDto;
class PostURLDto {
}
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.Length(1, 500),
    class_validator_1.IsUrl()
], PostURLDto.prototype, "src", void 0);
exports.PostURLDto = PostURLDto;
