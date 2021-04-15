import express from "express";

import authMiddleware from "./middleware/auth.middleware";
import testRoute from "./test/routes/authTest.route";
import postRoute from "./post/routes/post.route";
import MasterUserRoute from "./user/routes/MasterUserRouter";
import autoPullRoute from "./autopull/autopull.route";
import MasterPostRouter from "./post/routes/MasterPostRouter";

class MasterRouter {
	private _router = express.Router();

	get router() {
		return this._router;
	}

	private _connectRoutes() {
		this._router.use("/user", MasterUserRoute);
		this._router.use("/post", MasterPostRouter);
		this._router.use("/test_api", authMiddleware, testRoute);
		this._router.use("/post", postRoute);
		this._router.use("/autopull", autoPullRoute);
	}

	constructor() {
		this._connectRoutes();
	}
}

export = new MasterRouter().router;
