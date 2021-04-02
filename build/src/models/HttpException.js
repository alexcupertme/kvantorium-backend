"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(data, status, message) {
        super(message);
        this.data = data;
        this.status = status;
        this.message = message;
    }
}
exports.default = HttpException;
