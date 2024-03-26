import {Star} from "lucide-react";
import React, {useEffect, useState} from "react";
import {Textarea} from "../ui/textarea";
import {Button} from "../ui/button";

interface Ratings {
	content: number;
	instructor: number;
	interactiveElements: number;
	courseStructure: number;
	platformExperience: number;
	feedbackAndAssessment: number;
	supportAndResources: number;
	skillDevelopment: number;
	overallExperience: number;
}

const StarRating: React.FC<{value: number; onClick: () => void}> = ({
	value,
	onClick,
}) => {
	return (
		<span style={{cursor: "pointer"}} onClick={onClick}>
			<Star
				className="text-[#fabc11]"
				fill={value ? "#fabc11" : "white"}
				size={35}
			/>
		</span>
	);
};

const ReviewForm: React.FC = () => {
	const [review, setReview] = useState("");
	const fields = [
		"Content",
		"Instructor",
		"Interactive Elements",
		"Course Structure",
		"Platform Experience",
		"Feedback and Assessment",
		"Support and Resources",
		"Skill Development",
		"Overall Experience",
	];
	const [ratings, setRatings] = useState<Ratings>({
		content: 0,
		instructor: 0,
		interactiveElements: 0,
		courseStructure: 0,
		platformExperience: 0,
		feedbackAndAssessment: 0,
		supportAndResources: 0,
		skillDevelopment: 0,
		overallExperience: 0,
	});

	useEffect(() => scrollTo(0, 0), []);

	const reviewHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setReview(e.target.value);
	};

	const handleRatingChange = (field: keyof Ratings, value: number) => {
		setRatings({
			...ratings,
			[field]: value,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(ratings, review);
	};

	return (
		<div className="w-full h-full bg-[rgba(0,0,0,.4)] py-[100px] flex items-center justify-center">
			<div className="w-fit h-auto bg-white py-10 px-10 rounded-md flex flex-col items-center gap-10 overflow-y-scroll">
				<div className="w-full flex flex-col items-center justify-center gap-2">
					<h1 className="font-semibold text-xl">We value your feedback</h1>
					<h3 className="text-sm font-medium">It helps us imporve</h3>
				</div>
				<form onSubmit={handleSubmit} className="flex flex-col gap-10">
					{Object.keys(ratings).map((field) => (
						<div
							key={field}
							className="w-full flex flex-col items-center justify-center gap-5">
							<label className="font-semibold">
								{fields.find((item) =>
									item
										.toLowerCase()
										.replaceAll(" ", "")
										.includes(field.toLowerCase())
								)}
							</label>
							<div className="flex gap-4">
								{[1, 2, 3, 4, 5].map((star) => (
									<StarRating
										key={star}
										value={star <= ratings[field as keyof Ratings] ? 1 : 0}
										onClick={() =>
											handleRatingChange(field as keyof Ratings, star)
										}
									/>
								))}
							</div>
						</div>
					))}

					<div>
						<Textarea
							onChange={reviewHandler}
							rows={4}
							cols={50}
							placeholder="Enter your review here..."
						/>
					</div>

					<Button type="submit">Submit</Button>
				</form>
			</div>
		</div>
	);
};

export default ReviewForm;
