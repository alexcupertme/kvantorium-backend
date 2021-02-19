"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const DatabaseConfig_1 = __importDefault(require("./src/config/DatabaseConfig"));
const mongoose_1 = __importDefault(require("mongoose"));
function databaseConnect() {
    mongoose_1.default.connect(DatabaseConfig_1.default.config.user, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    mongoose_1.default.connection.on("connected", () => {
        console.log(`⚡️ [server]: Server successfully connected to database!`);
    });
    mongoose_1.default.connection.on("error", () => {
        console.log(`⚡️ [server]: Server can't connect to database...`);
    });
}
module.exports = databaseConnect;
