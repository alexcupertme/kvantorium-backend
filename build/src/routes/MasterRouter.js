"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const RegisterRouter_1 = __importDefault(require("./AuthAPI/RegisterRouter"));
const AuthRouter_1 = __importDefault(require("./AuthAPI/AuthRouter"));
const QueryUserInfoRouter_1 = __importDefault(require("./UserAPI/QueryUserInfoRouter"));
class MasterRouter {
    constructor() {
        this._router = express_1.Router();
        this._registerRouter = RegisterRouter_1.default;
        this._userInfoRouter = QueryUserInfoRouter_1.default;
        this._authRouter = AuthRouter_1.default;
        this._mainPage();
        this._configure();
    }
    get router() {
        return this._router;
    }
    _mainPage() {
        this._router.get("/", (req, res) => {
            res.send("API for server-kvantorium");
        });
    }
    /**
     * Connect routes to their matching routers.
     */
    _configure() {
        this._router.use(this._registerRouter.thisRoute, this._registerRouter.router); // Register API
        this._router.use(this._userInfoRouter.thisRoute, this._userInfoRouter.router); // Get user info by query API
        this._router.use(this._authRouter.thisRoute, this._authRouter.router); // Authenticate user by login and password
    }
}
module.exports = new MasterRouter().router;
