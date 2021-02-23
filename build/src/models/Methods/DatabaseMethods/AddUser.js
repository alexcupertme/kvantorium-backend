"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const UserSchema_1 = __importDefault(require("../../Interfaces/UserSchema"));
const GenerateHash_1 = __importDefault(require("../bcrypt/GenerateHash"));
module.exports = function addUser(data, callback) {
    let date = new Date();
    let params = {
        mail: data.mail,
        login: data.login,
        password: data.password,
        registerDate: date,
        role: "user",
    };
    let user = new UserSchema_1.default(params);
    GenerateHash_1.default(user.password, (err, hash) => {
        if (err)
            return callback(err);
        user.password = hash;
        user.save(callback);
    });
};
