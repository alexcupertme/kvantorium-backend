"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(request, response, next) {
    response.setHeader("Access-Control-Allow-Origin", " *");
    response.setHeader("Access-Control-Allow-Headers", " *");
    response.setHeader("Access-Control-Expose-Headers", " *");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    next();
}
exports.default = errorMiddleware;
