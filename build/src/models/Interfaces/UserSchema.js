"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    mail: {
        type: String,
        required: true,
    },
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        first: {
            type: String,
            default: "",
        },
        second: {
            type: String,
            default: "",
        },
    },
    description: {
        type: String,
        default: "Привет, мир!",
    },
    skills: [
        {
            id: {
                type: Number,
                default: 0,
            },
            name: {
                type: String,
                default: "",
            },
            description: {
                type: String,
                default: "",
            },
        },
    ],
    achievements: [
        {
            name: {
                type: String,
                default: "",
            },
        },
    ],
    kvantums: [
        {
            kvantum: {
                type: String,
                default: "",
            },
            level: {
                type: String,
                default: "",
            },
        },
    ],
    registerDate: {
        type: Number,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
});
const UserModel = mongoose_1.default.model("User", UserSchema);
module.exports = UserModel;
