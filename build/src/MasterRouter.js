"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("./middleware/auth.middleware"));
const authTest_route_1 = __importDefault(require("./test/routes/authTest.route"));
const post_route_1 = __importDefault(require("./post/routes/post.route"));
const MasterUserRouter_1 = __importDefault(require("./user/routes/MasterUserRouter"));
const autopull_route_1 = __importDefault(require("./autopull/autopull.route"));
const MasterPostRouter_1 = __importDefault(require("./post/routes/MasterPostRouter"));
class MasterRouter {
    constructor() {
        this._router = express_1.default.Router();
        this._connectRoutes();
    }
    get router() {
        return this._router;
    }
    _connectRoutes() {
        this._router.use("/user", MasterUserRouter_1.default);
        this._router.use("/post", MasterPostRouter_1.default);
        this._router.use("/test_api", auth_middleware_1.default, authTest_route_1.default);
        this._router.use("/post", post_route_1.default);
        this._router.use("/autopull", autopull_route_1.default);
    }
}
module.exports = new MasterRouter().router;
