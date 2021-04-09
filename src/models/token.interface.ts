interface TokenData {
	uuid: string;
	token: string;
	expiresIn: number;
	login: string;
}
interface DataStoredInToken {
	_id: string;
}

export { TokenData, DataStoredInToken };
