interface TokenData {
	token: string;
	expiresIn: number;
}
interface DataStoredInToken {
	_id: string;
}

export { TokenData, DataStoredInToken };
