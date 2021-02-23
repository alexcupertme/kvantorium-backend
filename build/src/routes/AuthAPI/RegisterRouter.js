"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const RegisterController_1 = __importDefault(require("../../controllers/RegisterController"));
class RegisterRouter {
    constructor() {
        this._router = express_1.Router();
        this._controller = RegisterController_1.default;
        this._action = "auth.register";
        this.route = "/register";
        this._configure();
    }
    get router() {
        return this._router;
    }
    get thisRoute() {
        return this.route;
    }
    /**
     * Connect routes to their matching controller endpoints.
     */
    _configure() {
        this._router.post("/", (req, res, next) => {
            try {
                this._controller.defaultMethod(req, (result) => {
                    result.action = this._action;
                    res.status(200).json(result);
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
module.exports = new RegisterRouter();