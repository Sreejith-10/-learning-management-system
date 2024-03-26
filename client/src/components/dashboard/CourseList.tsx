import {CourseType, InstructorType} from "@/lib/types";
import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "@/index.css";

const CourseList = () => {
	const [courses, setCourses] = useState<CourseType[]>([]);
	const [tutor, setTutor] = useState<InstructorType[]>([]);

	useEffect(() => {
		try {
			axios
				.get("/course/get-courses")
				.then(({data}) => setCourses(data.course));
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		try {
			axios
				.get("/instructor/get-instructors")
				.then(({data}) => setTutor(data.instructors));
		} catch (error) {
			console.log(error);
		}
	}, []);

	const t = (id: string) => {
		let name = tutor.filter((item) => item._id === id);
		let t = name[0]?.fname + " " + name[0]?.lname;
		return t;
	};

	return (
		<div className="w-full h-full bg-white rounded-lg shadow-md p-4 space-y-5 dark:bg-slate-900 dark:border dark:border-slate-200 dark:border-opacity-20">
			<div className="w-full flex items-center justify-between">
				<h1 className="text-2xl font-bold">Courses</h1>
				<Link
					to={"/dashboard/courses/new-course"}
					className="bg-blue-600 text-white px-3 py-2 rounded-md font-semibold text-base">
					Add Course
				</Link>
			</div>
			<div className="w-full h-auto flex flex-col gap-5 overflow-y-scroll ">
				{courses.map((course, idx) => (
					<Link
						to={"/dashboard/courses/single-course"}
						state={course}
						className="w-full h-auto">
						<div
							key={idx}
							className="w-full h-full flex items-center justify-between bg-slate-100 dark:bg-slate-700 px-5 py-4 rounded-lg shadow-md">
							<span className="w-10 h-10 bg-blue-500/20 rounded-md text-xl font-semibold grid place-content-center text-blue-600 dark:text-blue-100">
								{course.courseLevel.charAt(0).toUpperCase()}
							</span>
							<h2 className="font-bold text-lg w-[300px] text-center">
								{course.courseName}
							</h2>
							<h3 className="w-[200px] text-center font-medium text-lg text-slate-800 dark:text-slate-200">
								{t(course.courseInstructor)}
							</h3>
							<h4 className="w-24 text-slate-600 dark:text-slate-100">
								{course.courseLevel}
							</h4>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default CourseList;
