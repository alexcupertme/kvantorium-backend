"use strict";
exports.__esModule = true;
var ResponseSchema = /** @class */ (function () {
    function ResponseSchema(action, data, status, message) {
        this.action = action;
        this.data = data;
        this.status = status;
        this.message = message;
    }
    return ResponseSchema;
}());
exports["default"] = ResponseSchema;
