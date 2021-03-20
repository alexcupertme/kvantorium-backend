"use strict";
var DB_config_1 = require("./config/DB.config");
var mongoose_1 = require("mongoose");
function databaseConnect() {
    mongoose_1["default"].connect(DB_config_1["default"].config.user, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    mongoose_1["default"].connection.on("connected", function () {
        console.log("\u26A1\uFE0F [server]: Server successfully connected to database!");
    });
    mongoose_1["default"].connection.on("error", function () {
        console.log("\u26A1\uFE0F [server]: Server can't connect to database...");
    });
}
module.exports = databaseConnect;
