import DatabaseConfig from "./config/DB.config";
import mongoose from "mongoose";

function databaseConnect() {
	mongoose.connect(DatabaseConfig.config.user, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	mongoose.connection.on("connected", () => {
		console.log(`⚡️ [server]: Server successfully connected to database!`);
	});
	mongoose.connection.on("error", () => {
		console.log(`⚡️ [server]: Server can't connect to database...`);
	});
}

export = databaseConnect;
