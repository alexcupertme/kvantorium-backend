"use strict";
var express_1 = require("express");
var TestRoute = /** @class */ (function () {
    function TestRoute() {
        this._router = express_1["default"].Router();
        this._defaultRoute();
    }
    Object.defineProperty(TestRoute.prototype, "router", {
        get: function () {
            return this._router;
        },
        enumerable: false,
        configurable: true
    });
    TestRoute.prototype._defaultRoute = function () {
        this._router.post("/", function (req, res, next) {
            res.send("API v.2");
        });
    };
    return TestRoute;
}());
module.exports = new TestRoute().router;
