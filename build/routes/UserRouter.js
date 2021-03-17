"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
class UserRouter {
    constructor() {
        this._router = express_1.default.Router();
        this.route = "/login";
        this._action = "auth.login";
        this._helloWorld();
    }
    _helloWorld() {
        this._router.get("/", (req, res, next) => {
            res.status(200).send("hi");
        });
    }
}
module.exports = new UserRouter();
