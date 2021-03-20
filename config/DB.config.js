"use strict";
var DatabaseConfig = /** @class */ (function () {
    function DatabaseConfig() {
        this._user = "mongodb+srv://AlexGridAdmin:59ApRdZGFyrVoLsf@kvantorium.bxr7u.mongodb.net/users?retryWrites=true&w=majority";
        this._secretKey = "NTlBcFJkWkdGeXJWb0xzZjU5QXBSZFpHRnlyVm9Mc2Y1OUFwUmRaR0Z5clZvTHNmNTlBcFJkWkdGeXJWb0xzZjU5QXBSZFpHRnlyVm9Mc2Y1OUFwUmRaR0Z5clZvTHNm";
    }
    Object.defineProperty(DatabaseConfig.prototype, "config", {
        get: function () {
            return { user: this._user, secretKey: this._secretKey };
        },
        enumerable: false,
        configurable: true
    });
    return DatabaseConfig;
}());
module.exports = new DatabaseConfig();
