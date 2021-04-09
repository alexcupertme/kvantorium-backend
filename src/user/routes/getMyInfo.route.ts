import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import HttpException from "../../models/HttpException";
import MasterValidator from "../../MasterValidator";

import ResponseSchema from "../../models/ResponseSchema";
import TokenConfig from "../../config/token.config";
import { GetUserInfoDto } from "../validators/user.dto";
import exitCodes from "../../config/exitCodes.config";
import User from "../models/user.model";
import { DataStoredInToken } from "../../models/token.interface";

class GetMyInfoRouter {
	private _router = express.Router();

	get router() {
		return this._router;
	}

	private _getMyInfo = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
		const userData = (await jwt.verify(request.cookies.Authorization, TokenConfig.config.secretKey)) as DataStoredInToken;
		console.log(userData);
		const uuid = userData._id;
		await User.findOne({ id: uuid }, async (err, user: any) => {
			if (!user) next(new HttpException(0, 400, exitCodes.userNotFound));
			else {
				let resData: any = {
					login: user.login,
					name: user.name,
					skills: user.skills,
					achievements: user.achievements,
					kvantums: user.kvantums,
					description: user.description,
					role: user.role,
					registerDate: user.registerDate,
				};
				response.send(new ResponseSchema(request.originalUrl, resData, 1, exitCodes.success));
			}
		});
	};

	private _configure() {
		this._router.post("/", this._getMyInfo);
	}

	constructor() {
		this._configure();
	}
}

export = new GetMyInfoRouter().router;
