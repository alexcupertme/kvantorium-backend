"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoose = exports.databaseConnect = void 0;
const DB_config_1 = __importDefault(require("./config/DB.config"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.mongoose = mongoose_1.default;
function databaseConnect() {
    return __awaiter(this, void 0, void 0, function* () {
        mongoose_1.default.connect(DB_config_1.default.config.user, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        mongoose_1.default.connection.on("connected", () => {
            console.log(`⚡️ [server]: Server successfully connected to database!`);
        });
        mongoose_1.default.connection.on("error", () => {
            console.log(`⚡️ [server]: Server can't connect to database...`);
        });
    });
}
exports.databaseConnect = databaseConnect;
