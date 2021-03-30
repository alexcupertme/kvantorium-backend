"use strict";
class TokenConfig {
    constructor() {
        this._secretKey = "$2y$12$qZJNA.OrVima783k6h1oGeY6X3s8uJ8uAe/MHxyc0DG/4IoX9lhgy ";
        this._dateToExpire = 60 * 60 * 24 * 30; // 1 month
    }
    get config() {
        return { secretKey: this._secretKey, date: this._dateToExpire };
    }
}
module.exports = new TokenConfig();
