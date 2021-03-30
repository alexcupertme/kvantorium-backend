import express, { NextFunction, request, Request, Response } from "express";
import bcrypt from "bcrypt";

import HttpException from "../../models/HttpException";
import MasterValidator from "../../MasterValidator";

import ResponseSchema from "../../models/ResponseSchema";
import { ChangePasswordDto } from "../validators/user.validator";
import User from "../models/user.model";
import exitCodes from "../../config/exitCodes.config";
import createToken from "../../scripts/createToken";

class ChangePasswordRouter {
	private _router = express.Router();

	get router() {
		return this._router;
	}

	private _changePassword = async (request, response: express.Response, next: express.NextFunction) => {
		const userData = request.body;
		if (await bcrypt.compare(userData.oldPassword, request.user.password)) {
			const hashedPassword = await bcrypt.hash(userData.password, 10);
			await User.findOneAndUpdate({ login: request.user.login }, { password: hashedPassword });
			const tokenData = await createToken(request.user, User);
			await response.send(new ResponseSchema(request.originalUrl, { tokenData }, 1, exitCodes.success));
		} else {
			next(new HttpException(request.originalUrl, 0, exitCodes.wrongPassword));
		}
	};

	private _configure() {
		this._router.post("/", MasterValidator.validationMiddleware(ChangePasswordDto), this._changePassword);
	}

	constructor() {
		this._configure();
	}
}

export = new ChangePasswordRouter().router;
