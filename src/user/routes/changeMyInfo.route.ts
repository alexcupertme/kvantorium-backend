import express, { NextFunction, Request, Response } from "express";

import HttpException from "../../models/HttpException";
import MasterValidator from "../../MasterValidator";

import ResponseSchema from "../../models/ResponseSchema";
import { ChangeMyInfoDto, GetUserInfoDto } from "../validators/user.dto";
import User from "../models/user.model";
import exitCodes from "../../config/exitCodes.config";

class ChangeMyInfoRouter {
	private _router = express.Router();

	get router() {
		return this._router;
	}

	private _changeMyInfo = async (request, response: express.Response, next: express.NextFunction) => {
		const userData = request.body;
		await User.find({ login: userData.login }, async (err, user: any) => {
			if (user && user.login !== userData.login) next(new HttpException(0, 400, exitCodes.loginWasTaken));
			else {
				await User.find({ mail: userData.mail }, async (err, user: any) => {
					if (user && user.mail !== userData.mail) next(new HttpException(0, 400, exitCodes.emailWasTaken));
					else {
						await User.findOneAndUpdate({ login: request.user.login }, userData);
						await response.send(new ResponseSchema(request.originalUrl, 0, 1, exitCodes.success));
					}
				});
			}
		});
	};

	private _configure() {
		this._router.post("/", MasterValidator.validationMiddleware(ChangeMyInfoDto), this._changeMyInfo);
	}

	constructor() {
		this._configure();
	}
}

export = new ChangeMyInfoRouter().router;
