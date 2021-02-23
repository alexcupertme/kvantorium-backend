"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const UserSchema_1 = __importDefault(require("../../Interfaces/UserSchema"));
module.exports = function getQueryUserInfo(query, callback) {
    let validQuery = ["login", "name"];
    let params = {};
    for (const key in validQuery) {
        if (query[key] !== "") {
            console.log(query[key]);
            params[key] = query[key];
        }
    }
    UserSchema_1.default.find(params, (err, user) => {
        let userArray = [];
        let element;
        for (element of user) {
            let userdata = {
                login: element.login,
                name: element.name,
                skills: element.skills,
                achievements: element.achievements,
                kvantums: element.kvantums,
                description: element.description,
                role: element.role,
            };
            userArray.push(userdata);
        }
        return callback(err, userArray);
    });
};
