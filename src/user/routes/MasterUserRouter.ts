import authMiddleware from "./../../middleware/auth.middleware";
import express from "express";

import getUserInfoRoute from "./getUserInfo.route";
import changeMyInfoRoute from "./changeMyInfo.route";
import changePasswordRoute from "./changePassword.route";
import getMyInfoRoute from "./getMyInfo.route";
import registerRoute from "./register.route";
import loginRoute from "./login.route";

class MasterUserRouter {
	private _router = express.Router();

	get router() {
		return this._router;
	}

	private _connectRoutes() {
		this._router.use("/register", registerRoute);
		this._router.use("/login", loginRoute);
		this._router.use("/getmyinfo", authMiddleware, getMyInfoRoute);
		this._router.use("/getuserinfo", authMiddleware, getUserInfoRoute);
		this._router.use("/changeinfo", authMiddleware, changeMyInfoRoute);
		this._router.use("/changepassword", authMiddleware, changePasswordRoute);
	}

	constructor() {
		this._connectRoutes();
	}
}

export = new MasterUserRouter().router;
