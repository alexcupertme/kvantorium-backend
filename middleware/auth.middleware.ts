import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";
import { DataStoredInToken } from "../models/token.interface";
import TokenConfig from "../config/token.config";
import RequestWithUser from "../models/requestWithUser.interface";
import User from "../models/user.model";
import HttpException from "../exceptions/HttpException";

async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
	const cookies = request.cookies;
	if (cookies && cookies.Authorization) {
		try {
			const verificationResponse = jwt.verify(cookies.Authorization, TokenConfig.config.secretKey) as DataStoredInToken;
			const id = verificationResponse._id;
			await User.findOne({ _id: id }, {}, {}, async (err, user) => {
				if (!user) next(new HttpException(0, 400, "ERR_USER_NOT_FOUND"));
				else {
					request.user = user;
					next();
				}
			});
		} catch (error) {
			next(new HttpException(0, 400, "ERR_INVALID_TOKEN"));
		}
	} else {
		next(new HttpException(0, 400, "ERR_NO_TOKEN"));
	}
}

export default authMiddleware;
