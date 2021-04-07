"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const auth_middleware_1 = __importDefault(require("./middleware/auth.middleware"));
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./user/routes/user.route"));
const authTest_route_1 = __importDefault(require("./test/routes/authTest.route"));
const getUserInfo_route_1 = __importDefault(require("./user/routes/getUserInfo.route"));
const changeMyInfo_route_1 = __importDefault(require("./user/routes/changeMyInfo.route"));
const changePassword_route_1 = __importDefault(require("./user/routes/changePassword.route"));
const post_route_1 = __importDefault(require("./post/routes/post.route"));
const autopull_route_1 = __importDefault(require("./autopull/autopull.route"));
class MasterRouter {
    constructor() {
        this._router = express_1.default.Router();
        this._connectRoutes();
    }
    get router() {
        return this._router;
    }
    _connectRoutes() {
        this._router.use("/user", user_route_1.default);
        this._router.use("/test_api", auth_middleware_1.default, authTest_route_1.default);
        this._router.use("/getuserinfo", auth_middleware_1.default, getUserInfo_route_1.default);
        this._router.use("/changeinfo", auth_middleware_1.default, changeMyInfo_route_1.default);
        this._router.use("/changepassword", auth_middleware_1.default, changePassword_route_1.default);
        this._router.use("/post", post_route_1.default);
        this._router.use("/autopull", autopull_route_1.default);
    }
}
module.exports = new MasterRouter().router;
