import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mong_url = process.env.MONGO_URI;

mongoose.connect(mong_url);

const database = mongoose.connection;

database.on("open", () => {
	console.log("Connected to Database");
});

database.on("error", () => {
	console.log("Connection Failed");
});

export default database;
