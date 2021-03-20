"use strict";
exports.__esModule = true;
function errorMiddleware(request, response, next) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    next();
}
exports["default"] = errorMiddleware;
