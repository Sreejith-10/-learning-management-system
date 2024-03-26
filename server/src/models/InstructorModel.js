import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema({
	lname: {
		type: String,
		required: true,
	},
	fname: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
	profileImage: String,
	qualification: {
		type: String,
		required: true,
	},
	institute: String,
	experience: Number,
	role: {
		type: String,
		required: true,
	},
});

const InstructorModel = mongoose.model("instructors", instructorSchema);

export default InstructorModel;
