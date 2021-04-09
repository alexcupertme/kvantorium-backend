import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import TokenConfig from "../config/token.config";
import { TokenData, DataStoredInToken } from "../models/token.interface";

export = async function createToken(login): Promise<TokenData> {
	let uuid = uuidv4();
	let tokenConfig = TokenConfig.config;
	const expiresIn = tokenConfig.date; // 1 month
	const secret = tokenConfig.secretKey;
	const dataStoredInToken: DataStoredInToken = {
		_id: uuid,
	};
	return { uuid, login, expiresIn, token: jwt.sign(dataStoredInToken, secret, { expiresIn }) };
};
