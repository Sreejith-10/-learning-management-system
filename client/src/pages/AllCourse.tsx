import CourseCard from "@/components/ui/CourseCard";
import Links from "@/components/ui/Links";
import PageWrapper from "@/components/wrapper/PageWrapper";
import {CourseType} from "@/lib/types";
import {useAppSelector} from "@/redux";
import axios from "axios";
import {useEffect, useState} from "react";

const AllCourse = () => {
	const {searchKey} = useAppSelector((state) => state.course);
	const [course, setCourse] = useState<CourseType[]>();
	const [searchItem, setSearchItem] = useState<CourseType[]>();

	useEffect(() => scrollTo(0, 0), []);

	useEffect(() => {
		try {
			axios.get("/course/get-courses").then(({data}) => setCourse(data.course));
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		const filter = course?.filter((item) => {
			const key = searchKey.toLowerCase().trim();
			return item.courseName.toLowerCase().includes(key);
		});
		setSearchItem(filter);
	}, [searchKey]);

	return (
		<main className="w-full h-full mt-[80px] sm:mt-10 dark:bg-slate-900/70">
			<PageWrapper style={{flexDirection: "column"}}>
				<div className="pt-5">
					<Links />
				</div>
				<div className="w-full h-screen pt-10 mb-[200px]">
					<h1 className="font-semibold text-lg">
						{searchItem?.length} results for {searchKey}
					</h1>
					<div className="w-full h-auto flex flex-wrap sm:flex-col sm:items-center gap-5 pt-10">
						{searchItem?.map((course, idx) => (
							<CourseCard key={idx} data={course} />
						))}
					</div>
				</div>
			</PageWrapper>
		</main>
	);
};

export default AllCourse;
