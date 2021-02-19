"use strict";
class DatabaseConfig {
    constructor() {
        this._user = "mongodb+srv://AlexGridAdmin:59ApRdZGFyrVoLsf@kvantorium.bxr7u.mongodb.net/users?retryWrites=true&w=majority";
        this._secretKey = "";
    }
    get config() {
        return { user: this._user, secretKey: this._secretKey };
    }
}
module.exports = new DatabaseConfig();
