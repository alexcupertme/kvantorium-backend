"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(request, response, next) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    next();
}
exports.default = errorMiddleware;
