import express, { NextFunction, request, Request, Response } from "express";
import bcrypt from "bcrypt";

import HttpException from "../../models/HttpException";
import MasterValidator from "../../MasterValidator";

import ResponseSchema from "../../models/ResponseSchema";
import User from "../../user/models/user.model";
import exitCodes from "../../config/exitCodes.config";
import createToken from "../../scripts/createToken";
import { PostDto } from "../validators/post.validator";

class PostRouter {
	private _router = express.Router();

	get router() {
		return this._router;
	}

	private _getPostById = async (request, response: express.Response, next: express.NextFunction) => {};

	private _configure() {
		this._router.post("/", MasterValidator.postValidationMiddleware(PostDto), this._getPostById);
	}

	constructor() {
		this._configure();
	}
}

export = new PostRouter().router;
