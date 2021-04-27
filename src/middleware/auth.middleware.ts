import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";
import { DataStoredInToken } from "../models/token.interface";
import TokenConfig from "../config/token.config";
import RequestWithUser from "../user/models/requestWithUser.interface";
import User from "../user/models/user.model";
import exitCodes from "../config/exitCodes.config";
import HttpException from "../models/HttpException";

async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
	if (request.body.token != undefined) {
		try {
			const verificationResponse = jwt.verify(request.body.token, TokenConfig.config.secretKey) as DataStoredInToken;
			const id = verificationResponse._id;
			await User.findOne({ id }, {}, {}, async (err, user) => {
				if (!user) next(new HttpException(0, 200, exitCodes.invalidToken));
				else {
					request.user = user;
					next();
				}
			});
		} catch (error) {
			next(new HttpException(0, 200, exitCodes.invalidToken));
		}
	} else {
		next(new HttpException(0, 200, exitCodes.noToken));
	}
}

export default authMiddleware;
