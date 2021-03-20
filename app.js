"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var path_1 = require("path");
var morgan_1 = require("morgan");
var cookie_parser_1 = require("cookie-parser");
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var MasterRouter_1 = require("./routes/MasterRouter");
var error_middleware_1 = require("./middleware/error.middleware");
var unknownRoute_middleware_1 = require("./middleware/unknownRoute.middleware");
var DatabaseConnection_1 = require("./DatabaseConnection");
var responseSettings_middleware_1 = require("./middleware/responseSettings.middleware");
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1["default"]();
        this.router = express_1["default"].Router();
        this._PORT = 8080 || process.env.PORT;
        this._configureMiddlewares();
        DatabaseConnection_1["default"]();
        this._initializeErrorHandling();
    }
    Server.prototype.listen = function () {
        var _this = this;
        this.app.listen(this._PORT, function () {
            console.log("\u26A1\uFE0F [server]: Server is running at http://localhost:" + _this._PORT);
        });
    };
    Server.prototype._initializeErrorHandling = function () {
        this.app.use(error_middleware_1["default"]);
    };
    Server.prototype._configureMiddlewares = function () {
        this.app.use(body_parser_1["default"].json());
        this.app.use(cookie_parser_1["default"]());
        this.app.use(responseSettings_middleware_1["default"]);
        this.app.use("/api", MasterRouter_1["default"]);
        var accessLogStream = fs_1["default"].createWriteStream(path_1["default"].join(__dirname, "access.log"), { flags: "a" });
        this.app.use(morgan_1["default"]("combined", { stream: accessLogStream })); // Setup logs
        this.app.use(unknownRoute_middleware_1["default"]);
    };
    return Server;
}());
var server = new Server();
server.listen();
