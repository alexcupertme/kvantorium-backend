"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const MasterRouter_1 = __importDefault(require("./routes/MasterRouter"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const unknownRoute_middleware_1 = __importDefault(require("./middleware/unknownRoute.middleware"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.router = express_1.default.Router();
        this._PORT = 8080 || process.env.PORT;
        this._configureRouters();
        this._configureMiddlewares();
        this._initializeErrorHandling();
    }
    listen() {
        this.app.listen(this._PORT, () => {
            console.log(`⚡️ [server]: Server is running at http://localhost:${this._PORT}`);
        });
    }
    _configureRouters() {
        this.app.use("/api", MasterRouter_1.default);
    }
    _initializeErrorHandling() {
        this.app.use(error_middleware_1.default);
    }
    _configureMiddlewares() {
        this.app.use(body_parser_1.default.json());
        this.app.use("/api", MasterRouter_1.default);
        let accessLogStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, "access.log"), { flags: "a" });
        this.app.use(morgan_1.default("combined", { stream: accessLogStream }));
        this.app.use(unknownRoute_middleware_1.default);
    }
}
let server = new Server();
server.listen();
