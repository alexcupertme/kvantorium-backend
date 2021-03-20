import express, { NextFunction, Request, Response } from "express";
import UserRoute from "./user.route";
import TestRoute from "./authTest.route";
import getUserInfoRoute from "./getUserInfo.route";
import authMiddleware from "../middleware/auth.middleware";

class MasterRouter {
	private _router = express.Router();

	get router() {
		return this._router;
	}

	private _connectRoutes() {
		this._router.use("/user", UserRoute);
		this._router.use("/test_api", authMiddleware, TestRoute);
		this._router.use("/getuserinfo", authMiddleware, getUserInfoRoute);
	}

	private _defaultRoute() {
		this._router.post("/", (req, res, next) => {
			res.send("API v.2");
		});
	}

	constructor() {
		this._defaultRoute();
		this._connectRoutes();
	}
}

export = new MasterRouter().router;
