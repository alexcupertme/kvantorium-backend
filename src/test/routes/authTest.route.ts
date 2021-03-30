import express, { NextFunction, Request, Response } from "express";
import authMiddleware from "../../middleware/auth.middleware";

class TestRoute {
	private _router = express.Router();

	get router() {
		return this._router;
	}

	private _defaultRoute() {
		this._router.post("/", (req, res, next) => {
			res.send("API v.2");
		});
	}

	constructor() {
		this._defaultRoute();
	}
}

export = new TestRoute().router;
