"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const bcrypt_1 = __importDefault(require("bcrypt"));
module.exports = function comparePass(passFromUser, userDBPass, callback) {
    if (passFromUser == undefined)
        return false;
    bcrypt_1.default.compare(passFromUser, userDBPass, (err, isMatch) => {
        if (err)
            throw err;
        callback(null, isMatch);
    });
};
