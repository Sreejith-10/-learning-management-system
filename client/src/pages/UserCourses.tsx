import Links from "@/components/ui/Links";
import {Progress} from "@/components/ui/progress";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import PageWrapper from "@/components/wrapper/PageWrapper";
import {useAppDispatch, useAppSelector} from "@/redux";
import {updateUserCourses} from "@/redux/courseSlice";
import axios from "axios";
import {Search} from "lucide-react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const UserCourses = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [filterKey, setFilterKey] = useState<string>("");
	const [_courseStatus, setCoureStatus] = useState("");

	const {user} = useAppSelector((state) => state.auth);
	const {userCourses} = useAppSelector((state) => state.course);

	let filterResult = [];

	useEffect(() => {
		const getCourses = async () => {
			let arr = [];
			for (const course of user.courses) {
				if (course.courseId) {
					const {data} = await axios.get(
						"/course/get-single-course/" + course.courseId
					);
					arr.push(data.course);
				}
			}
			dispatch(updateUserCourses(arr));
		};

		return () => {
			getCourses();
		};
	}, []);

	filterResult = userCourses.filter((item) =>
		item.courseName.toLowerCase().includes(filterKey.toLowerCase())
	);

	return (
		<main className="w-full h-fit lg:w-auto lg:mt-0 mt-20 sm:mt-0">
			<section className="w-full h-fit py-5">
				<PageWrapper style={{alignItems: "center", justifyContent: "center"}}>
					<div className="w-full flex items-center justify-between lg:flex-col gap-5 mt-10 lg:mt-5">
						<div className="lg:text-start text-start">
							<Links />
						</div>
						<div className="w-1/2 lg:w-full flex items-center">
							<span className="w-full lg:flex border border-slate-400 border-opacity-40 flex items-center gap-3 p-[8px] rounded-[8px]">
								<input
									type="text"
									onChange={(e) => setFilterKey(e.target.value)}
									className="w-full outline-none text-base font-medium dark:bg-inherit"
									placeholder="Search Course"
								/>
								<Search />
							</span>
						</div>
						<div>
							<Select onValueChange={(value) => setCoureStatus(value)}>
								<SelectTrigger className="w-[200px] sm:w-[150px]">
									<SelectValue placeholder="Select Course Status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Started">Started</SelectItem>
									<SelectItem value="Continuing">Continuing</SelectItem>
									<SelectItem value="Expired">Expired</SelectItem>
									<SelectItem value="Completed">Completed</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</PageWrapper>
			</section>
			<section className="w-full h-auto py-10 lg:py-5">
				<PageWrapper>
					<div className="w-full h-auto grid grid-cols-4 xls:grid-cols-3 xl:grid-cols-3 lg:grid-cols-1 lg:gap-5 md:flex md:flex-wrap md:gap-0 sm:gap-0 gap-5 mt-10 sm:items-center sm:justify-center">
						{" "}
						{filterResult.length < 1 ? (
							<div className="w-full">
								<h1>Nothing found</h1>
							</div>
						) : (
							filterResult?.map((course, index) => (
								<div
									onClick={() => {
										navigate("/course-data", {state: course._id});
									}}
									key={index}
									className="w-[300px] h-fit cursor-pointer space-y-3 bg-white dark:bg-slate-900 rounded-lg shadow-md border border-slate-400 border-opacity-40 p-2">
									<div className="w-full">
										{course?.thumbnail ? (
											<img
												src={`http://localhost:8080/upload/${course?.thumbnail}`}
												alt="not found"
												className="rounded-md"
											/>
										) : (
											<img
												src="/assets/random/3.jpg"
												alt="not found"
												className="rounded-md"
											/>
										)}
									</div>
									<div className="w-full space-y-4">
										<h2 className="font-semibold text-lg">
											{course.courseName}
										</h2>
										<h2 className="font-medium text-slate-600">
											{course.sessions.length} Session Course
										</h2>
										<span className="flex gap-1 font-bold items-center justify-center">
											<Progress
												value={
													user?.courses?.find(
														(item) => item?.courseId === course?._id
													)?.progress
												}>
												{
													user?.courses?.find(
														(item) => item?.courseId === course?._id
													)?.progress
												}
												%
											</Progress>
										</span>
										<h2 className="w-full p-2 text-center font-bold uppercase bg-slate-950 text-white rounded-md">
											{
												user.courses?.map((item) => {
													return item.courseId === course?._id
														? item.status
														: "Started";
												})[0]
											}
										</h2>
									</div>
								</div>
							))
						)}
					</div>
				</PageWrapper>
			</section>
		</main>
	);
};

export default UserCourses;
