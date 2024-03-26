import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
	fname: {
		type: String,
		required: true,
	},
	lname: {
		type: String,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
	},
	createdOn: {
		type: Date,
		default: Date.now(),
	},
	role: {
		type: String,
		enum: ["Admin", "User"],
	},
});

const AuthModel = mongoose.model("auths", authSchema);

export default AuthModel;
