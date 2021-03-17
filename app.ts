import express, { Request, Response } from "express";

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

	private _configRouter() {
		this.app.use(
			"/",
			this.router.get("/hello", (request, response) => {
				response.send("Hello world!");
			})
		);
	}

	private _unknownRoute() {
		this.app.get("*", (request: Request, response: Response) => {
			response.json({ exitCode: -1, msg: "This method does not exists!" });
		});
	}

	constructor() {
		this._configRouter();
		this._unknownRoute();
	}
}

let server = new Server();
server.listen();
