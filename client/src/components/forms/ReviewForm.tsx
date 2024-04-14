import {ArrowLeft, Star} from "lucide-react";
import React, {useEffect, useState} from "react";
import {Textarea} from "../ui/textarea";
import {Button} from "../ui/button";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useToast} from "../ui/use-toast";

const ReviewForm: React.FC = () => {
	const [review, setReview] = useState("");
	const [ratings, setRatings] = useState(0);

	const {userid, courseid} = useParams();

	const {toast} = useToast();
	const navigate = useNavigate();

	useEffect(() => scrollTo(0, 0), []);

	const reviewHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setReview(e.target.value);
	};

	const handleRatingChange = (val: number) => {
		if (val <= ratings) {
			setRatings(val - 1);
		} else {
			setRatings(val);
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		try {
			e.preventDefault();

			if (review === "" || ratings === 0) {
				return toast({
					title: "Error",
					description: "Feedback connot be empty",
				});
			}

			axios.post(
				"/review/new-review",
				{courseid, userid, ratings, review},
				{headers: {"Content-Type": "application/json"}}
			);
			toast({title: "Success", description: "Your feedback is submitted"});
			navigate(-1);
		} catch (error) {
			console.log(error);
			toast({
				title: "Error",
				description: "Something went wrong please try again",
			});
		}
	};

	return (
		<main className="w-full h-dvh bg-[rgba(0,0,0,.4)] py-[100px] flex items-center justify-center">
			<div className="w-fit h-auto bg-white py-10 px-10 rounded-md flex flex-col items-center gap-10">
				<div
					className="w-full flex items-center gap-2 hover:text-blue-500 cursor-pointer"
					onClick={() => navigate(-1)}>
					<ArrowLeft size={20} />
					<p>Back</p>
				</div>
				<div className="w-full flex flex-col items-center justify-center gap-2">
					<h1 className="font-semibold text-xl">We value your feedback</h1>
					<h3 className="text-sm font-medium">It helps us imporve</h3>
				</div>
				<form onSubmit={handleSubmit} className="flex flex-col gap-10">
					<div className="w-full flex items-center justify-center gap-5">
						{[...Array(5)].map((_star, index) => {
							return (
								<span onClick={() => handleRatingChange(index + 1)}>
									{ratings >= index + 1 ? (
										<Star
											className="fill-yellow-500 text-yellow-500"
											size={35}
										/>
									) : (
										<Star className="text-yellow-500" size={35} />
									)}
								</span>
							);
						})}
					</div>
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
		</main>
	);
};

export default ReviewForm;
