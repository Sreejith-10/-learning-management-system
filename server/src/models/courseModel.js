import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
	courseName: {
		required: true,
		type: String,
	},
	courseDescription: {
		required: true,
		type: String,
	},
	courseDuration: {
		required: true,
		type: Number,
	},
	courseInstructor: {
		required: true,
		type: String,
	},
	courseLevel: {
		required: true,
		type: String,
		enum: ["beginner", "ametuer", "intermediate", "expert"],
	},
	createdOn: {
		type: Date,
		default: Date.now(),
	},
	startDate: {
		type: String,
		required: true,
	},
	endDate: {
		type: String,
		required: true,
	},
	thumbnail: String,
	topics: [{type: String}],
	skillsGain: [{type: String}],
	coursePrice: {
		type: Number,
		required: true,
	},
	sessions: [
		{
			sessionTitle: {
				required: true,
				type: String,
			},
			sessionDescription: {
				required: true,
				type: String,
			},
			sessionDuration: {
				required: true,
				type: Number,
			},
			sessionTopics: [
				{
					topicTitle: {
						type: String,
						required: true,
					},
					topicVideo: {
						type: String,
						required: true,
					},
				},
			],
		},
	],
});

const CourseModel = mongoose.model("courses", courseSchema);

export default CourseModel;
