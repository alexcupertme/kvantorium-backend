"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(request, response, next) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    response.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
}
exports.default = errorMiddleware;
