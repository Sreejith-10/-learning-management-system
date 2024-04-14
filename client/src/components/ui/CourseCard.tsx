import {Star} from "lucide-react";
import {motion} from "framer-motion";
import {Link} from "react-router-dom";
import {CourseType} from "@/lib/types";
import {useEffect, useState} from "react";
import axios from "axios";

const CourseCard = ({data}: {data: CourseType}) => {
	const [review, setReview] = useState(0);

	const fetchData = async () => {
		axios
			.get("/review/get-review/" + data._id)
			.then(({data}) => setReview(data?.reviews?.reviews?.length));
	};

	useEffect(() => {
		try {
			fetchData();
		} catch (error) {
			console.log(error);
		}
	}, [data]);

	return (
		<motion.div
			initial={{translateX: 0}}
			whileHover={{translateY: -20, boxShadow: "0px 0px 30px 2px #0f0f0f"}}
			transition={{ease: "easeIn", delay: 0.3}}
			className="w-[300px] max-w-[300px] lg:max-w-[250px] sm:min-w-[500px] sm:max-w-[500px] sm:w-[500px] md:min-w-[300px] min-h-[470px] max-h-[470px] shadow-md cursor-pointer  border border-slate-400 border-opacity-30 rounded-xl p-3 space-y-4">
			<Link
				to={"/course/" + data._id}
				state={{courseId: data._id}}
				className="w-full h-full flex flex-col gap-3">
				<div className="w-full h-[200px]">
					{data.thumbnail ? (
						<img
							src={`http://localhost:8080/upload/${data.thumbnail}`}
							alt="not found"
							className="w-full h-full rounded-md"
						/>
					) : (
						<img
							src="/assets/Converting-Instructor-Led-Training-to-E-Learning-7.24.18.jpg"
							alt="not found"
							className="w-full h-full rounded-md"
						/>
					)}
				</div>
				<div className="w-full h-fit flex flex-col items-start justify-between gap-4">
					<h2 className="font-semibold text-lg pt-4">{data.courseName}</h2>
					<div className="w-full flex flex-wrap gap-2">
						<h4 className="font-semibold text-sm text-slate-800 dark:text-slate-500">
							skills you'll gain:
						</h4>
						<div className="w-full h-fit flex flex-wrap gap-2">
							{data.skillsGain.slice(0, 6).map((skill, index) => {
								if (skill !== "")
									return (
										<span
											className="font-medium text-[12px] text-slate-600 bg-slate-200/50 dark:bg-slate-200 rounded-md px-2 py-1"
											key={index}>
											{skill}
										</span>
									);
							})}
						</div>
					</div>
					<div className="flex items-center justify-start gap-2">
						<Star className="fill-yellow-500 text-yellow-500" size={20} />
						<span className="font-medium text-sm">{review} reviews</span>
					</div>
					<span className="text-start font-semibold text-slate-500 text-[12px]">
						{data.courseLevel} | Professional Cirtificatie |{" "}
						{data.courseDuration} Months
					</span>
				</div>
			</Link>
		</motion.div>
	);
};

export default CourseCard;
