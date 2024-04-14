import mongoose from "mongoose";

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
				type: Number,
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
