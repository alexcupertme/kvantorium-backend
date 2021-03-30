"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseSchema {
    constructor(action, data, status, message) {
        this.action = action;
        this.data = data;
        this.status = status;
        this.message = message;
    }
}
exports.default = ResponseSchema;
