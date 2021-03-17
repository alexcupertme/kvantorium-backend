import express, { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";

class UserRouter {
	private _router = express.Router();
	private _action = "auth.login";

	get router() {
		return this._router;
	}

	private _getUserByQuery() {
		this._router.get("/", (req: Request, res: Response, next: NextFunction) => {
			res.send("Hello there!");
		});
	}

	constructor() {
		this._getUserByQuery();
	}
}

export = new UserRouter().router;
