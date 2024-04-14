import ReviewModel from "../models/reviewModel.js";

export const addNewReview = async (req, res) => {
	try {
		const {courseid, userid, ratings, review} = req.body;

		const course = await ReviewModel.findOne({courseId: courseid});

		if (course) {
			course.reviews.addToSet({
				userId: userid,
				rating: ratings,
				review: review,
			});
			course.save();
		} else {
			await ReviewModel.create({
				courseId: courseid,
				reviews: {userId: userid, rating: ratings, review: review},
			});
		}
		return res.status(201).json({message: "Review Added"});
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({message: "Something went wrong", error: error});
	}
};

export const getReviewById = async (req, res) => {
	try {
		const id = req.params.id;

		const courseReviews = await ReviewModel.findOne({courseId: id});

		return res.status(200).json({reviews: courseReviews});
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({message: "Something went wrong", error: error});
	}
};
