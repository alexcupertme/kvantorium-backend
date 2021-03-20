"use strict";
var TokenConfig = /** @class */ (function () {
    function TokenConfig() {
        this._secretKey = "$2y$12$qZJNA.OrVima783k6h1oGeY6X3s8uJ8uAe/MHxyc0DG/4IoX9lhgy ";
        this._dateToExpire = 60 * 60 * 24 * 30; // 1 month
    }
    Object.defineProperty(TokenConfig.prototype, "config", {
        get: function () {
            return { secretKey: this._secretKey, date: this._dateToExpire };
        },
        enumerable: false,
        configurable: true
    });
    return TokenConfig;
}());
module.exports = new TokenConfig();
