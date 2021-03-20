"use strict";
var HttpException_1 = require("../exceptions/HttpException");
module.exports = function unknownRoute(request, response, next) {
    next(new HttpException_1["default"](0, 0, "This method does not exists!"));
};
