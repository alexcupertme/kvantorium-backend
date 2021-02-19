"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const ThemeBController_1 = __importDefault(require("../../controllers/ThemeBController"));
class ThemeARouter {
    constructor() {
        this._router = express_1.Router();
        this._controller = ThemeBController_1.default;
        this.route = '/themeB';
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
        this._router.get('/', (req, res, next) => {
            try {
                const result = this._controller.defaultMethod();
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
module.exports = new ThemeARouter();
