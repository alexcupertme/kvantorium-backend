import express, { NextFunction, Request, Response } from "express";
import { plainToClass } from "class-transformer";

import HttpException from "../exceptions/HttpException";
import MasterValidator from "../validators/MasterValidator";

import ResponseSchema from "../exceptions/ResponseSchema";
import { GetQueryUserInfoDto } from "../validators/user.validator";
import User from "../models/user.model";

class GetUserInfoRouter {
	private _router = express.Router();

	get router() {
		return this._router;
	}

	private _getUserInfo = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
		const userData = request.body;
		await User.find(userData, async (err, user: any) => {
			if (!user) next(new HttpException(0, 400, "ERR_USER_NOT_FOUND"));
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
					};
					resData.push(resItem);
				});
				response.send(new ResponseSchema(request.originalUrl, resData, 1, "Success!"));
			}
		});
	};

	private _configure() {
		this._router.post("/", MasterValidator(GetQueryUserInfoDto), this._getUserInfo);
	}

	constructor() {
		this._configure();
	}
}

export = new GetUserInfoRouter().router;
