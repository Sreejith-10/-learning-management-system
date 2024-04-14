import {Star} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "./avatar";
import {useEffect, useState} from "react";
import axios from "axios";
import {UserType} from "@/lib/types";

type ReviewProps = {
	userId: string;
	rating: number;
	review: string;
	postDate: Date;
};

const Review = ({userReview}: {userReview: ReviewProps}) => {
	const [user, setUser] = useState<UserType>();

	useEffect(() => {
		const fetchUser = async () => {
			const {data} = await axios.get("/user/single-user/" + userReview.userId);
			setUser(data.user);
		};

		fetchUser();
	}, []);

	const convertDate = () => {
		let date = new Date(userReview.postDate).toDateString();

		return date.split("").splice(4).join("");
	};

	return (
		<div className="w-[400px] sm:w-1/2 h-fit py-2 px-3 flex gap-5 border border-slate-400 border-opacity-30 rounded-md">
			<div className="w-[10%]">
				<Avatar>
					<AvatarFallback>{user?.userName?.charAt(0)}</AvatarFallback>
					<AvatarImage
						src={
							user?.profileImage?.toLowerCase().includes("google")
								? user.profileImage
								: "/assets/random/4.jpg"
						}
						alt="profile img"
					/>
				</Avatar>
			</div>
			<div className="w-[90%] space-y-3">
				<div className="w-full flex items-center justify-between">
					<div>
						<h2 className="font-semibold">{user?.userName}</h2>
						<h3 className="text-slate-500">{convertDate()}</h3>
					</div>
					<div className="flex items-center gap-2">
						{userReview?.rating}
						<Star className="text-yellow-500 fill-yellow-500" size={15} />
					</div>
				</div>
				<p className="font-medium text-sm">{userReview?.review}</p>
			</div>
		</div>
	);
};

export default Review;
