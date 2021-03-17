"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.router = express_1.default.Router();
        this._PORT = 8080 || process.env.PORT;
        this._configRouter();
        this._unknownRoute();
    }
    listen() {
        this.app.listen(this._PORT, () => {
            console.log(`⚡️ [server]: Server is running at http://localhost:${this._PORT}`);
        });
    }
    _configRouter() {
        this.app.use("/", this.router.get("/hello", (request, response) => {
            response.send("Hello world!");
        }));
    }
    _unknownRoute() {
        this.app.get("*", (request, response) => {
            response.json({ exitCode: -1, msg: "This method does not exists!" });
        });
    }
}
let server = new Server();
server.listen();
