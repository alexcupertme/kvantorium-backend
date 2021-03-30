import authMiddleware from "./middleware/auth.middleware";
import express, { NextFunction, Request, Response } from "express";

import userRoute from "./user/routes/user.route";
import testRoute from "./test/routes/authTest.route";
import getUserInfoRoute from "./user/routes/getUserInfo.route";
import changeMyInfoRoute from "./user/routes/changeMyInfo.route";
import changePasswordRoute from "./user/routes/changePassword.route";
import postRoute from "./post/routes/post.route";

class MasterRouter {
	private _router = express.Router();

	get router() {
		return this._router;
	}

	private _connectRoutes() {
		this._router.use("/user", userRoute);
		this._router.use("/test_api", authMiddleware, testRoute);
		this._router.use("/getuserinfo", authMiddleware, getUserInfoRoute);
		this._router.use("/changeinfo", authMiddleware, changeMyInfoRoute);
		this._router.use("/changepassword", authMiddleware, changePasswordRoute);
		this._router.use("/post", postRoute);
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
