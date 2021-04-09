import { TokenData } from "../models/token.interface";

export default function _createCookie(tokenData: TokenData) {
	return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}; Path=/api/`;
}
