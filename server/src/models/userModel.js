import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
	},
	userEmail: {
		type: String,
		required: true,
		unique: true,
	},
	userName: {
		type: String,
		required: true,
	},
	profileImage: String,
	workPreference: {
		role: String,
		industry: String,
		workRemote: Boolean,
		relocate: Boolean,
	},
	workExperience: [
		{
			role: String,
			company: String,
			startYear: String,
			startMonth: String,
			endYear: String,
			endMonth: String,
			currentlyWorking: {
				type: Boolean,
				default: false,
			},
			description: String,
		},
	],
	education: [
		{
			institute: String,
			qualification: String,
			startYear: String,
			startMonth: String,
			endYear: String,
			endMonth: String,
			currentlyStudying: {
				type: Boolean,
				default: false,
			},
		},
	],
	courses: [
		{
			courseId: String,
			buyingDate: {
				type: Date,
				default: Date.now(),
			},
			status: {
				// enum: "Started" | "Continuing" | "Completed" | "Expired",
				default: "Started",
				type: String,
			},
			progress: {
				type: Number,
				default: 0,
			},
			sessionsCompleted: [String],
		},
	],
});

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
