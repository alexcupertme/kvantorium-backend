"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const User_route_1 = __importDefault(require("./User.route"));
class MasterRouter {
    constructor() {
        this._router = express_1.default.Router();
        this._connectRoutes();
    }
    get router() {
        return this._router;
    }
    _connectRoutes() {
        this._router.use("/user", User_route_1.default);
    }
}
module.exports = new MasterRouter().router;
