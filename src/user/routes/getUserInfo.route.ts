import express, { NextFunction, Request, Response } from "express";

import HttpException from "../../models/HttpException";
import MasterValidator from "../../MasterValidator";

import ResponseSchema from "../../models/ResponseSchema";
import { GetUserInfoDto } from "../validators/user.validator";
import exitCodes from "../../config/exitCodes.config";
import User from "../models/user.model";

class GetUserInfoRouter {
	private _router = express.Router();

	get router() {
		return this._router;
	}

	private _getUserInfo = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
		const userData = request.body;
		await User.find(userData, async (err, user: any) => {
			if (!user) next(new HttpException(0, 400, exitCodes.userNotFound));
			else {
				let resData: any = [];
				user.forEach((element) => {
					let resItem: any = {
						login: element.login,
						name: element.name,
						skills: element.skills,
						achievements: element.achievements,
						kvantums: element.kvantums,
						description: element.description,
						role: element.role,
						registerDate: element.registerDate,
					};
					resData.push(resItem);
				});
				response.send(new ResponseSchema(request.originalUrl, resData, 1, exitCodes.success));
			}
		});
	};

	private _configure() {
		this._router.post("/", MasterValidator.validationMiddleware(GetUserInfoDto), this._getUserInfo);
	}

	constructor() {
		this._configure();
	}
}

export = new GetUserInfoRouter().router;
