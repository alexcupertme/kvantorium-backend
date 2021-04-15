import authMiddleware from "./../../middleware/auth.middleware";
import express from "express";

import createPostRoute from "./createPost.route";

class MasterUserRouter {
	private _router = express.Router();

	get router() {
		return this._router;
	}

	private _connectRoutes() {
		this._router.use("/createpost", authMiddleware, createPostRoute);
	}

	constructor() {
		this._connectRoutes();
	}
}

export = new MasterUserRouter().router;
