class DatabaseConfig {
	private _user: string =
		"mongodb+srv://AlexGridAdmin:59ApRdZGFyrVoLsf@kvantorium.bxr7u.mongodb.net/users?retryWrites=true&w=majority";
	private _secretKey: string =
		"NTlBcFJkWkdGeXJWb0xzZjU5QXBSZFpHRnlyVm9Mc2Y1OUFwUmRaR0Z5clZvTHNmNTlBcFJkWkdGeXJWb0xzZjU5QXBSZFpHRnlyVm9Mc2Y1OUFwUmRaR0Z5clZvTHNm";

	constructor() {}

	get config() {
		return { user: this._user, secretKey: this._secretKey };
	}
}

export = new DatabaseConfig();
