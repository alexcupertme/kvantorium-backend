import express, { NextFunction, Request, Response } from "express";
import UserRoute from "./User.route";

class MasterRouter {
	private _router = express.Router();

	get router() {
		return this._router;
	}

	private _connectRoutes() {
		this._router.use("/user", UserRoute);
	}

	constructor() {
		this._connectRoutes();
	}
}

export = new MasterRouter().router;
