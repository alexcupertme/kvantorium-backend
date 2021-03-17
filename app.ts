import fs from "fs";
import path from "path";
import morgan from "morgan";
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import MasterRouter from "./routes/MasterRouter";
import errorMiddleware from "./middleware/error.middleware";
import unknownRoute from "./middleware/unknownRoute.middleware";
import HttpException from "./exceptions/HttpException";

class Server {
	public app = express();
	public router = express.Router();
	private _PORT = 8080 || process.env.PORT;

	public listen() {
		this.app.listen(this._PORT, () => {
			console.log(
				`⚡️ [server]: Server is running at http://localhost:${this._PORT}`
			);
		});
	}

	private _configureRouters() {
		this.app.use("/api", MasterRouter);
	}

	private _initializeErrorHandling() {
		this.app.use(errorMiddleware);
	}

	private _configureMiddlewares() {
		this.app.use(bodyParser.json());
		this.app.use("/api", MasterRouter);

		let accessLogStream = fs.createWriteStream(
			path.join(__dirname, "access.log"),
			{ flags: "a" }
		);
		this.app.use(morgan("combined", { stream: accessLogStream }));
		this.app.use(unknownRoute);
	}

	constructor() {
		this._configureRouters();
		this._configureMiddlewares();
		this._initializeErrorHandling();
	}
}

let server = new Server();
server.listen();
