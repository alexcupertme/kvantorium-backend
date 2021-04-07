import authMiddleware from "./middleware/auth.middleware";
import express, { NextFunction, Request, Response } from "express";

import userRoute from "./user/routes/user.route";
import testRoute from "./test/routes/authTest.route";
import getUserInfoRoute from "./user/routes/getUserInfo.route";
import changeMyInfoRoute from "./user/routes/changeMyInfo.route";
import changePasswordRoute from "./user/routes/changePassword.route";
import postRoute from "./post/routes/post.route";
import autoPullRoute from "./autopull/autopull.route";

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
		this._router.use("/autopull", autoPullRoute);
	}

	constructor() {
		this._connectRoutes();
	}
}

export = new MasterRouter().router;
