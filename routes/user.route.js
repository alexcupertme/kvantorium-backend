"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var express_1 = require("express");
var bcrypt_1 = require("bcrypt");
var jsonwebtoken_1 = require("jsonwebtoken");
var HttpException_1 = require("../exceptions/HttpException");
var MasterValidator_1 = require("../validators/MasterValidator");
var token_config_1 = require("../config/token.config");
var ResponseSchema_1 = require("../exceptions/ResponseSchema");
var user_validator_1 = require("../validators/user.validator");
var user_model_1 = require("../models/user.model");
var UserRouter = /** @class */ (function () {
    function UserRouter() {
        var _this = this;
        this._router = express_1["default"].Router();
        this._registration = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var userData;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userData = request.body;
                        return [4 /*yield*/, user_model_1["default"].findOne({ login: userData.login }, {}, {}, function (err, user) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!user) return [3 /*break*/, 1];
                                            next(new HttpException_1["default"](0, 400, "ERR_LOGIN_WAS_TAKEN"));
                                            return [3 /*break*/, 3];
                                        case 1: return [4 /*yield*/, user_model_1["default"].findOne({ mail: userData.mail }, {}, {}, function (err, user) { return __awaiter(_this, void 0, void 0, function () {
                                                var hashedPassword, user_1, tokenData;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            if (!user) return [3 /*break*/, 1];
                                                            next(new HttpException_1["default"](0, 400, "ERR_EMAIL_ALREADY_REGISTERED"));
                                                            return [3 /*break*/, 7];
                                                        case 1: return [4 /*yield*/, bcrypt_1["default"].hash(userData.password, 10)];
                                                        case 2:
                                                            hashedPassword = _a.sent();
                                                            return [4 /*yield*/, user_model_1["default"].create(__assign(__assign({}, userData), { password: hashedPassword }))];
                                                        case 3:
                                                            user_1 = _a.sent();
                                                            return [4 /*yield*/, this.createToken(user_1)];
                                                        case 4:
                                                            tokenData = _a.sent();
                                                            return [4 /*yield*/, response.setHeader("Set-Cookie", [this._createCookie(tokenData)])];
                                                        case 5:
                                                            _a.sent();
                                                            return [4 /*yield*/, response.send(new ResponseSchema_1["default"](request.originalUrl, { tokenData: tokenData }, 1, "Success!"))];
                                                        case 6:
                                                            _a.sent();
                                                            _a.label = 7;
                                                        case 7: return [2 /*return*/];
                                                    }
                                                });
                                            }); })];
                                        case 2:
                                            _a.sent();
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this._login = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var userData;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userData = request.body;
                        return [4 /*yield*/, user_model_1["default"].findOne({ login: userData.login }, {}, {}, function (err, user) { return __awaiter(_this, void 0, void 0, function () {
                                var isPasswordMatching, tokenData;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!!user) return [3 /*break*/, 1];
                                            next(new HttpException_1["default"](0, 400, "ERR_USER_NOT_FOUND"));
                                            return [3 /*break*/, 3];
                                        case 1: return [4 /*yield*/, bcrypt_1["default"].compare(userData.password, user.password)];
                                        case 2:
                                            isPasswordMatching = _a.sent();
                                            if (isPasswordMatching) {
                                                tokenData = this.createToken(user);
                                                response.setHeader("Set-Cookie", [this._createCookie(tokenData)]);
                                                response.send(new ResponseSchema_1["default"](request.originalUrl, { tokenData: tokenData }, 1, "Success!"));
                                            }
                                            else {
                                                next(new HttpException_1["default"](0, 400, "ERR_WRONG_PASSWORD"));
                                            }
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this._configure();
    }
    Object.defineProperty(UserRouter.prototype, "router", {
        get: function () {
            return this._router;
        },
        enumerable: false,
        configurable: true
    });
    UserRouter.prototype.createToken = function (user) {
        var tokenConfig = token_config_1["default"].config;
        var expiresIn = tokenConfig.date; // 1 month
        var secret = tokenConfig.secretKey;
        var dataStoredInToken = {
            _id: user._id
        };
        return {
            expiresIn: expiresIn,
            token: jsonwebtoken_1["default"].sign(dataStoredInToken, secret, { expiresIn: expiresIn })
        };
    };
    UserRouter.prototype._createCookie = function (tokenData) {
        return "Authorization=" + tokenData.token + "; HttpOnly; Max-Age=" + tokenData.expiresIn + "; Path=/api/";
    };
    UserRouter.prototype._configure = function () {
        this._router.post("/register", MasterValidator_1["default"](user_validator_1.RegisterDto), this._registration);
        this._router.post("/login", MasterValidator_1["default"](user_validator_1.LoginDto), this._login);
    };
    return UserRouter;
}());
module.exports = new UserRouter().router;
