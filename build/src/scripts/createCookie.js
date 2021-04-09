"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function _createCookie(tokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}; Path=/api/`;
}
exports.default = _createCookie;
