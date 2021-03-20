import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import HttpException from "../exceptions/HttpException";
import MasterValidator from "../validators/MasterValidator";

import TokenConfig from "../config/token.config";
import ResponseSchema from "../exceptions/ResponseSchema";
import { LoginDto, RegisterDto } from "../validators/user.validator";
import User from "../models/user.model";
import { TokenData, DataStoredInToken } from "../models/token.interface";

class UserRouter {
	private _router = express.Router();

	get router() {
		return this._router;
	}

	private createToken(user): TokenData {
		let tokenConfig = TokenConfig.config;
		const expiresIn = tokenConfig.date; // 1 month
		const secret = tokenConfig.secretKey;
		const dataStoredInToken: DataStoredInToken = {
			_id: user._id,
		};
		return {
			expiresIn,
			token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
		};
	}

	private _createCookie(tokenData: TokenData) {
		return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}; Path=/api/`;
	}

	private _registration = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
		const userData: RegisterDto = request.body;
		await User.findOne({ login: userData.login }, {}, {}, async (err, user) => {
			if (user) next(new HttpException(0, 400, "ERR_LOGIN_WAS_TAKEN"));
			else {
				await User.findOne({ mail: userData.mail }, {}, {}, async (err, user) => {
					if (user) next(new HttpException(0, 400, "ERR_EMAIL_ALREADY_REGISTERED"));
					else {
						const hashedPassword = await bcrypt.hash(userData.password, 10);
						const user = await User.create({
							...userData,
							password: hashedPassword,
						});
						const tokenData = await this.createToken(user);
						await response.setHeader("Set-Cookie", [this._createCookie(tokenData)]);
						await response.send(new ResponseSchema(request.originalUrl, { tokenData }, 1, "Success!"));
					}
				});
			}
		});
	};

	private _login = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
		const userData: LoginDto = request.body;
		await User.findOne({ login: userData.login }, {}, {}, async (err, user) => {
			if (!user) next(new HttpException(0, 400, "ERR_USER_NOT_FOUND"));
			else {
				const isPasswordMatching = await bcrypt.compare(userData.password, user.password);
				if (isPasswordMatching) {
					const tokenData = this.createToken(user);
					response.setHeader("Set-Cookie", [this._createCookie(tokenData)]);
					response.send(new ResponseSchema(request.originalUrl, { tokenData }, 1, "Success!"));
				} else {
					next(new HttpException(0, 400, "ERR_WRONG_PASSWORD"));
				}
			}
		});
	};

	private _configure() {
		this._router.post("/register", MasterValidator(RegisterDto), this._registration);
		this._router.post("/login", MasterValidator(LoginDto), this._login);
	}

	constructor() {
		this._configure();
	}
}

export = new UserRouter().router;
