import ReviewModel from "../models/reviewModel.js";

export const addNewReview = async (req, res) => {
	try {
		const {courseId, userId, rating, review} = req.body;

		const newReview = await ReviewModel.findOneAndUpdate(
			{courseId},
			{$addToSet: {reviews: {userId: userId, rating: rating, review: review}}}
		);

		if (newReview)
			return res.status(201).json({message: "Review Added", review: newReview});
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({message: "Something went wrong", error: error});
	}
};

export const getAllReviews = async (req, res) => {
	try {
		const reviews = ReviewModel.find();

		if (reviews) {
			res.status(200).json({reviews: reviews});
		}
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({message: "Something went wrong", error: error});
	}
};
