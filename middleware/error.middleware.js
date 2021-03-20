"use strict";
exports.__esModule = true;
function errorMiddleware(error, request, response, next) {
    var status = error.status || 500;
    var data = error.data || 0;
    var type = "error";
    var message = error.message || "Something went wrong";
    response.status(status).send({ type: type, data: data, status: status, message: message });
}
exports["default"] = errorMiddleware;
