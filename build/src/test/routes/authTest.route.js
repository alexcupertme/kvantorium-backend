"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
class TestRoute {
    constructor() {
        this._router = express_1.default.Router();
        this._defaultRoute();
    }
    get router() {
        return this._router;
    }
    _defaultRoute() {
        this._router.post("/", (req, res, next) => {
            res.send("API v.2");
        });
    }
}
module.exports = new TestRoute().router;
