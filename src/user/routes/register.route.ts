import express, { NextFunction, Request, Response } from "express";

import HttpException from "../../models/HttpException";
import MasterValidator from "../../MasterValidator";

import ResponseSchema from "../../models/ResponseSchema";
import { RegisterDto } from "../validators/user.dto";
import exitCodes from "../../config/exitCodes.config";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import createToken from "../../scripts/createToken";
import createCookie from "../../scripts/createCookie";

class RegisterRouter {
	private _router = express.Router();

	get router() {
		return this._router;
	}

	private _register = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
		const userData: RegisterDto = request.body;
		await User.findOne({ login: userData.login }, {}, {}, async (err, user) => {
			if (user) next(new HttpException(0, 400, exitCodes.loginWasTaken));
			else {
				await User.findOne({ mail: userData.mail }, {}, {}, async (err, user) => {
					if (user) next(new HttpException(0, 400, exitCodes.emailWasTaken));
					else {
						const hashedPassword = await bcrypt.hash(userData.password, 10);
						const user = await User.create({
							...userData,
							password: hashedPassword,
						});
						const tokenData = await createToken(user.login);
						await User.updateOne({ login: user.login }, { id: tokenData.uuid });
						await response.setHeader("Set-Cookie", [createCookie(tokenData)]);
						await response.send(new ResponseSchema(request.originalUrl, { tokenData }, 1, exitCodes.success));
					}
				});
			}
		});
	};

	private _configure() {
		this._router.post("/", MasterValidator.validationMiddleware(RegisterDto), this._register);
	}

	constructor() {
		this._configure();
	}
}

export = new RegisterRouter().router;
