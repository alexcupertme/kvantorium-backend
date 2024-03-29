import * as mongoose from "mongoose";
import User from "./user.interface";

const UserSchema = new mongoose.Schema({
	mail: String,
	login: String,
	password: String,
	id: { type: String, default: "" },
	avatar: {
		type: String,
		default: "",
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
		default: Date.now(),
	},
	role: String,
});

const userModel = mongoose.model<User & mongoose.Document>("User", UserSchema);

export default userModel;
