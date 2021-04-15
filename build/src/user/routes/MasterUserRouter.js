"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const auth_middleware_1 = __importDefault(require("./../../middleware/auth.middleware"));
const express_1 = __importDefault(require("express"));
const getUserInfo_route_1 = __importDefault(require("./getUserInfo.route"));
const changeMyInfo_route_1 = __importDefault(require("./changeMyInfo.route"));
const changePassword_route_1 = __importDefault(require("./changePassword.route"));
const getMyInfo_route_1 = __importDefault(require("./getMyInfo.route"));
const register_route_1 = __importDefault(require("./register.route"));
const login_route_1 = __importDefault(require("./login.route"));
class MasterUserRouter {
    constructor() {
        this._router = express_1.default.Router();
        this._connectRoutes();
    }
    get router() {
        return this._router;
    }
    _connectRoutes() {
        this._router.use("/register", register_route_1.default);
        this._router.use("/login", login_route_1.default);
        this._router.use("/getmyinfo", auth_middleware_1.default, getMyInfo_route_1.default);
        this._router.use("/getuserinfo", auth_middleware_1.default, getUserInfo_route_1.default);
        this._router.use("/changeinfo", auth_middleware_1.default, changeMyInfo_route_1.default);
        this._router.use("/changepassword", auth_middleware_1.default, changePassword_route_1.default);
    }
}
module.exports = new MasterUserRouter().router;
