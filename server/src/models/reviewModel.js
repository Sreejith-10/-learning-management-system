import mongoose, {mongo} from "mongoose";

const reviewSchema = new mongoose.Schema({
	courseId: {
		required: true,
		type: String,
	},
	reviews: [
		{
			userId: {
				type: String,
				required: true,
			},
			rating: {
				content: Number,
				instructor: Number,
				interactiveElements: Number,
				courseStructure: Number,
				platformExperience: Number,
				feedbackAndAssessment: Number,
				supportAndResources: Number,
				skillDevelopment: Number,
				overallExperience: Number,
			},
			review: {
				type: String,
			},
			postDate: {
				type: Date,
				default: Date.now(),
			},
		},
	],
});

const ReviewModel = mongoose.model("review", reviewSchema);

export default ReviewModel;
