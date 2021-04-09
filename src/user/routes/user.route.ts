import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

import HttpException from "../../models/HttpException";
import MasterValidator from "../../MasterValidator";

import ResponseSchema from "../../models/ResponseSchema";
import { LoginDto, RegisterDto } from "../validators/user.dto";
import User from "../models/user.model";
import exitCodes from "../../config/exitCodes.config";
import { TokenData } from "../../models/token.interface";
import createCookie from "../../scripts/createCookie";

import createToken from "../../scripts/createToken";

class UserRouter {
	private _router = express.Router();

	get router() {
		return this._router;
	}

	private _registration = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
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
	private _login = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
		const userData: LoginDto = request.body;
		await User.findOne({ login: userData.login }, {}, {}, async (err, user) => {
			if (!user) next(new HttpException(0, 400, exitCodes.userNotFound));
			else {
				const isPasswordMatching = await bcrypt.compare(userData.password, user.password);
				if (isPasswordMatching) {
					const tokenData = await createToken(user.login);
					await User.updateOne({ login: user.login }, { id: tokenData.uuid });
					response.setHeader("Set-Cookie", [createCookie(tokenData)]);
					response.send(new ResponseSchema(request.originalUrl, { tokenData }, 1, exitCodes.success)).end();
				} else {
					next(new HttpException(0, 400, exitCodes.wrongPassword));
				}
			}
		});
	};

	private _configure() {
		this._router.post("/register", MasterValidator.validationMiddleware(RegisterDto), this._registration);
		this._router.post("/login", MasterValidator.validationMiddleware(LoginDto), this._login);
	}

	constructor() {
		this._configure();
	}
}

export = new UserRouter().router;
