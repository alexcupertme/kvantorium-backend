class TokenConfig {
	private _secretKey: string = "$2y$12$qZJNA.OrVima783k6h1oGeY6X3s8uJ8uAe/MHxyc0DG/4IoX9lhgy ";
	private _dateToExpire: number = 60 * 60 * 24 * 30; // 1 month
	constructor() {}

	get config() {
		return { secretKey: this._secretKey, date: this._dateToExpire };
	}
}

export = new TokenConfig();
