"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const UserSchema_1 = __importDefault(require("../UserSchema"));
const GenerateHash_1 = __importDefault(require("../GenerateHash"));
const RegisterValidator_1 = __importDefault(require("../Validators/RegisterValidator"));
module.exports = function addUser(data, callback) {
    let date = new Date();
    let params = {
        mail: data.mail,
        login: data.login,
        password: data.password,
        registerDate: date,
        role: "user",
    };
    let valid = new RegisterValidator_1.default();
    valid.validate(valid, (error) => {
        if (error) {
            return callback(null, error);
        }
        else {
            let user = new UserSchema_1.default(params);
            GenerateHash_1.default(user.password, (err, hash) => {
                if (err)
                    return callback(err);
                user.password = hash;
                user.save(callback);
            });
        }
    });
};
