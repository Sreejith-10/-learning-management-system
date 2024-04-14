import Review from "./ui/review";
import {Progress} from "./ui/progress";
import {Star} from "lucide-react";
import {ReviewType} from "@/lib/types";

const RatingAndReview = ({courseReview}: {courseReview: ReviewType}) => {
	const counts: {[rating: number]: number} = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};

	courseReview.reviews?.forEach((item) => {
		counts[item.rating] += 1;
	});

	const stars: {rating: number; count: number}[] = Object.entries(counts).map(
		([rating, count]) => ({
			rating: parseInt(rating),
			count,
		})
	);

	const averageRating = courseReview?.reviews?.reduce((acc, curr) => {
		return acc + curr.rating;
	}, 0);

	const rounded = Math.round(
		(averageRating / 5) * courseReview?.reviews?.length
	);

	const item = {
		usernaem: "sreejith",
		id: "3747477",
		phones: [
			{type: "Iphone"},
			{type: "Apple"},
			{type: "Samsung"},
			{type: "Lg"},
			{type: "Alas"},
			{type: "Pova"},
		],
	};

	return (
		<section className="w-full sm:w-full md:w-full lg:w-full h-auto py-5">
			<div className="w-full py-5">
				<h1 className="font-semibold pl-2 text-xl">Ratings and Review</h1>
			</div>
			<div className="w-full py-5 flex">
				<div className="w-1/2 flex flex-col items-center gap-3">
					<h1 className="font-bold text-6xl">
						{(averageRating / 5) * courseReview?.reviews?.length}
					</h1>
					<span className="w-full flex items-center justify-center gap-5">
						{[...Array(5)].map((_item, index) => (
							<Star
								key={index}
								className={`text-yellow-500 ${
									rounded >= index + 1 ? "fill-yellow-500" : "fill-white"
								}`}
								size={35}
							/>
						))}
					</span>
					<h2 className="font-semibold">
						{courseReview?.reviews?.length} Reviews
					</h2>
				</div>
				<div className="w-1/2 flex items-center gap-2 justify-evenly flex-col">
					{stars.reverse().map((item, index) => (
						<span
							key={index}
							className="w-full flex items-center justify-center gap-5">
							<p className="font-semibold">{item?.rating} Stars</p>
							<Progress
								className="w-[400px]"
								value={item?.count}
								indicatorColor="bg-yellow-500"
							/>
							<p className="font-semibold text-center">{item?.count}</p>
						</span>
					))}
				</div>
			</div>
			<div className="w-full py-5 flex items-center justify-start">
				<div className="w-fit flex flex-wrap gap-5">
					{courseReview?.reviews?.map((review) => (
						<Review key={review.userId} userReview={review} />
					))}
				</div>
			</div>
		</section>
	);
};

export default RatingAndReview;
