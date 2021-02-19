"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const bcrypt_1 = __importDefault(require("bcrypt"));
module.exports = function genHash(data, callback) {
    bcrypt_1.default.genSalt(10, (err, salt) => {
        if (err)
            return callback(err);
        bcrypt_1.default.hash(data, salt, (err, hash) => {
            return callback(err, hash);
        });
    });
};
