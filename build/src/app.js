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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const MasterRouter_1 = __importDefault(require("./MasterRouter"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const unknownRoute_middleware_1 = __importDefault(require("./middleware/unknownRoute.middleware"));
const DatabaseConnection_1 = require("./DatabaseConnection");
const setup_middleware_1 = __importDefault(require("./middleware/setup.middleware"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.router = express_1.default.Router();
        this._PORT = 8080 || process.env.PORT;
        DatabaseConnection_1.databaseConnect();
        this._configureMiddlewares();
        this._initializeErrorHandling();
        this.server();
    }
    server() {
        if (process.env.TEST !== "true") {
            this.app.listen(this._PORT, () => {
                console.log(`⚡️ [server]: Server is running at http://localhost:${this._PORT}`);
            });
        }
    }
    _initializeErrorHandling() {
        this.app.use(error_middleware_1.default);
    }
    _configureMiddlewares() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use(body_parser_1.default.json());
            this.app.use(cookie_parser_1.default());
            this.app.use(setup_middleware_1.default);
            this.app.use("/api", MasterRouter_1.default);
            let accessLogStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, "access.log"), { flags: "a" });
            this.app.use(morgan_1.default("combined", { stream: accessLogStream })); // Setup logs
            this.app.use(unknownRoute_middleware_1.default);
        });
    }
}
exports.default = new Server();
