"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(error, request, response, next) {
    const status = error.status || 500;
    const data = error.data || 0;
    const type = "error";
    const message = error.message || "Something went wrong";
    response.status(status).send({ type, data, status, message });
}
exports.default = errorMiddleware;
