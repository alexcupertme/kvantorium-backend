"use strict";
var express_1 = require("express");
var user_route_1 = require("./user.route");
var authTest_route_1 = require("./authTest.route");
var getUserInfo_route_1 = require("./getUserInfo.route");
var auth_middleware_1 = require("../middleware/auth.middleware");
var MasterRouter = /** @class */ (function () {
    function MasterRouter() {
        this._router = express_1["default"].Router();
        this._defaultRoute();
        this._connectRoutes();
    }
    Object.defineProperty(MasterRouter.prototype, "router", {
        get: function () {
            return this._router;
        },
        enumerable: false,
        configurable: true
    });
    MasterRouter.prototype._connectRoutes = function () {
        this._router.use("/user", user_route_1["default"]);
        this._router.use("/test_api", auth_middleware_1["default"], authTest_route_1["default"]);
        this._router.use("/getuserinfo", auth_middleware_1["default"], getUserInfo_route_1["default"]);
    };
    MasterRouter.prototype._defaultRoute = function () {
        this._router.post("/", function (req, res, next) {
            res.send("API v.2");
        });
    };
    return MasterRouter;
}());
module.exports = new MasterRouter().router;
