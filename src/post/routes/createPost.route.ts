import express, { NextFunction, request, Request, Response } from "express";

import MasterValidator from "../../MasterValidator";

import { PostDto } from "../validators/post.dto";

class CreatePostRouter {
	private _router = express.Router();

	get router() {
		return this._router;
	}

	private _createPost = async (request, response: express.Response, next: express.NextFunction) => {};

	private _configure() {
		this._router.post("/", MasterValidator.postValidationMiddleware(PostDto), this._createPost);
	}

	constructor() {
		this._configure();
	}
}

export = new CreatePostRouter().router;
