import fs from "fs";
import path from "path";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import MasterRouter from "./routes/MasterRouter";
import errorMiddleware from "./middleware/error.middleware";
import unknownRoute from "./middleware/unknownRoute.middleware";
import databaseConnect from "./DatabaseConnection";
import responseSettings from "./middleware/responseSettings.middleware";

class Server {
	public app = express();
	public router = express.Router();
	private _PORT = 8080 || process.env.PORT;

	public listen() {
		this.app.listen(this._PORT, () => {
			console.log(`⚡️ [server]: Server is running at http://localhost:${this._PORT}`);
		});
	}

	private _initializeErrorHandling() {
		this.app.use(errorMiddleware);
	}

	private _configureMiddlewares() {
		this.app.use(bodyParser.json());
		this.app.use(cookieParser());
		this.app.use(responseSettings);
		this.app.use("/api", MasterRouter);
		let accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });
		this.app.use(morgan("combined", { stream: accessLogStream })); // Setup logs
		this.app.use(unknownRoute);
	}

	constructor() {
		this._configureMiddlewares();
		databaseConnect();
		this._initializeErrorHandling();
	}
}

let server = new Server();
server.listen();
