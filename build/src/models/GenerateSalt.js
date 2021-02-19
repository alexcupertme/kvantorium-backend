"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const bcrypt_1 = __importDefault(require("bcrypt"));
module.exports = function genSalt(data) {
    bcrypt_1.default.genSalt(10, (err, salt) => {
        if (err)
            throw err;
        bcrypt_1.default.hash(data, salt, (err, hash) => {
            if (err)
                throw err;
            return hash;
        });
    });
};
