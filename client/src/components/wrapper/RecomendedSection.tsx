import CourseCard from "../ui/CourseCard";
import {motion} from "framer-motion";
import PageWrapper from "./PageWrapper";
import {Button} from "../ui/button";
import {useEffect, useState} from "react";
import axios from "axios";
import {CourseType} from "@/lib/types";
import {Skeleton} from "../ui/skeleton";

const RecomendedSection = () => {
	const [num, setNum] = useState(4);
	const [course, setCourse] = useState<CourseType[]>([]);

	useEffect(() => {
		try {
			axios.get("/course/get-courses").then(({data}) => setCourse(data.course));
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<section className="w-full h-auto flex flex-col gap-16 mt-32 sm:mt-20 md:mt-20">
			<PageWrapper style={{flexDirection: "column"}}>
				<div className="w-full h-auto flex items-center justify-between">
					<span className="mb-5">
						<h2 className="text-4xl sm:text-2xl md:text-3xl font-semibold text-purple-950 dark:text-slate-200">
							Recomended Courses
						</h2>
						<p className="text-slate-600  dark:text-slate-500">
							Discover your perfect program in our courses
						</p>
					</span>
				</div>
				<div className="w-full h-auto grid grid-cols-4 xls:grid-cols-3 xl:grid-cols-3 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 lg:gap-5 gap-5 mt-10">
					{" "}
					{course.length > 0
						? course.slice(0, num).map((item, id) => (
								<motion.span
									key={id}
									initial={{translateX: 100, opacity: 0}}
									whileInView={{translateX: 0, opacity: 1}}
									transition={{delay: id * 0.5}}
									viewport={{once: true}}>
									<CourseCard key={id} data={item} />
								</motion.span>
						  ))
						: Array(4)
								.fill("")
								.map((_, id) => (
									<div
										className="w-[300px] max-w-[300px] min-h-[470px] max-h-[470px] shadow-md cursor-pointer bg-slate-100 dark:text-slate-900 rounded-md p-3 space-y-4"
										key={id}>
										<Skeleton className="w-full h-[200px] bg-slate-200 dark:text-slate-900" />
										<Skeleton className="w-full h-5 bg-slate-200" />
										<Skeleton className="w-full h-10 bg-slate-200" />
										<div className="flex gap-5 flex-wrap">
											<Skeleton className="w-16 h-8 bg-slate-200" />
											<Skeleton className="w-16 h-8 bg-slate-200" />
											<Skeleton className="w-24 h-8 bg-slate-200" />
											<Skeleton className="w-24 h-8 bg-slate-200" />
										</div>
										<Skeleton className="w-full h-5 bg-slate-200" />
									</div>
								))}
				</div>
				<div className="w-full h-auto pt-8">
					{course.length > 4 ? (
						<Button
							onClick={() => setNum(8)}
							className="bg-blue-700 hover:bg-blue-500 dark:text-slate-100">
							Show More
						</Button>
					) : null}
				</div>
			</PageWrapper>
		</section>
	);
};

export default RecomendedSection;
