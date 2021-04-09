import fs from "fs";
import path from "path";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import * as http from "http";
import MasterRouter from "./MasterRouter";
import errorMiddleware from "./middleware/error.middleware";
import unknownRoute from "./middleware/unknownRoute.middleware";
import { databaseConnect } from "./DatabaseConnection";
import responseSettings from "./middleware/setup.middleware";

class Server {
	public app = express();
	public router = express.Router();
	private _PORT = 8080 || process.env.PORT;

	public server = this.app.listen(this._PORT, () => {
		console.log(`⚡️ [server]: Server is running at http://localhost:${this._PORT}`);
	});

	private _initializeErrorHandling() {
		this.app.use(errorMiddleware);
	}

	private async _configureMiddlewares() {
		this.app.use(bodyParser.json());
		this.app.use(cookieParser());
		this.app.use(responseSettings);
		this.app.use("/api", MasterRouter);
		let accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });
		this.app.use(morgan("combined", { stream: accessLogStream })); // Setup logs
		this.app.use(unknownRoute);
	}

	constructor() {
		databaseConnect();
		this._configureMiddlewares();
		this._initializeErrorHandling();
	}
}
export default new Server();
