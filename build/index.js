"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const MasterRouter_1 = __importDefault(require("./src/routes/MasterRouter"));
const DatabaseConnection_1 = __importDefault(require("./DatabaseConnection"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.router = MasterRouter_1.default;
    }
}
/**Main server router initalizator */
const server = new Server();
// make server listen on some port
((PORT = process.env.PORT || 5000) => {
    server.app.use(body_parser_1.default.json());
    let accessLogStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, "access.log"), { flags: "a" });
    server.app.use(morgan_1.default("combined", { stream: accessLogStream }));
    server.app.listen(PORT, () => {
        console.log(`⚡️ [server]: Server is running at http://localhost:${PORT}`);
        DatabaseConnection_1.default();
    });
})();
server.app.use("/api", server.router); // Main route
server.app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        status: "error",
        statusCode: err.statusCode,
        message: err.message,
    });
});
