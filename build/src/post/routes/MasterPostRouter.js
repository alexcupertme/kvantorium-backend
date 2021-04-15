"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const auth_middleware_1 = __importDefault(require("./../../middleware/auth.middleware"));
const express_1 = __importDefault(require("express"));
const createPost_route_1 = __importDefault(require("./createPost.route"));
class MasterUserRouter {
    constructor() {
        this._router = express_1.default.Router();
        this._connectRoutes();
    }
    get router() {
        return this._router;
    }
    _connectRoutes() {
        this._router.use("/createpost", auth_middleware_1.default, createPost_route_1.default);
    }
}
module.exports = new MasterUserRouter().router;
