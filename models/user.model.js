"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
    mail: String,
    login: String,
    password: String,
    avatar: {
        type: String,
        "default": ""
    },
    name: {
        first: {
            type: String,
            "default": ""
        },
        second: {
            type: String,
            "default": ""
        }
    },
    description: {
        type: String,
        "default": "Привет, мир!"
    },
    skills: [
        {
            id: {
                type: Number,
                "default": 0
            },
            name: {
                type: String,
                "default": ""
            },
            description: {
                type: String,
                "default": ""
            }
        },
    ],
    achievements: [
        {
            name: {
                type: String,
                "default": ""
            }
        },
    ],
    kvantums: [
        {
            kvantum: {
                type: String,
                "default": ""
            },
            level: {
                type: String,
                "default": ""
            }
        },
    ],
    registerDate: Number,
    role: String
});
var postModel = mongoose.model("User", UserSchema);
exports["default"] = postModel;
