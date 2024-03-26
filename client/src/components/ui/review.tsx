import {Star} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "./avatar";

const Review = () => {
	return (
		<div className="w-[400px] h-fit py-2 px-3 flex gap-5 border border-slate-400 border-opacity-30 rounded-md">
			<div className="w-[10%]">
				<Avatar>
					<AvatarFallback>A</AvatarFallback>
					<AvatarImage src="/assets/random/1.jpeg" alt="profile img" />
				</Avatar>
			</div>
			<div className="w-[90%] space-y-3">
				<div className="w-full flex items-center justify-between">
					<div>
						<h2 className="font-semibold">Killue Patrick</h2>
						<h3 className="text-slate-500">October 2023</h3>
					</div>
					<div>
						<Star className="text-yellow-500 fill-yellow-500" size={15} />
					</div>
				</div>
				<p className="font-medium text-sm">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime
					incidunt unde consequatur facere dolorum nam, ea minima, iste tempora
					numquam quisquam nemo illo perspiciatis, natus explicabo labore libero
					ipsum tempore deserunt. Voluptatum necessitatibus voluptate quibusdam
					vel modi, corrupti perferendis distinctio.
				</p>
			</div>
		</div>
	);
};

export default Review;
