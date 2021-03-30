import * as mongoose from "mongoose";
import Post from "./post.interface";

const PostSchema = new mongoose.Schema({
	blocks: [
		{
			type: {
				type: String,
				default: "",
			},
			data: {
				type: Object,
				default: "",
			},
			cover: {
				type: String,
				default: "",
			},
			anchor: {
				type: String,
				default: "",
			},
		},
	],
});

const postModel = mongoose.model<Post & mongoose.Document>("User", PostSchema);

export default postModel;
