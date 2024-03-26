import SideNav from "@/components/dashboard/SideNav";
import {useTheme} from "@/components/theme-provider";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Calendar} from "@/components/ui/calendar";
import {useAppDispatch, useAppSelector} from "@/redux";
import {
	updateCourses,
	updateInstructors,
	updateUsers,
} from "@/redux/dashboardSlice";
import DashBoardRoute from "@/routes/DashBoardRoute";
import axios from "axios";
import {
	Bell,
	Book,
	GraduationCap,
	Moon,
	School,
	Sun,
	Telescope,
} from "lucide-react";
import {useEffect, useState} from "react";

export const Dashboard = () => {
	const dispatch = useAppDispatch();

	const {theme, setTheme} = useTheme();

	const {courses, users, instructors} = useAppSelector(
		(state) => state.dashboard
	);

	useEffect(() => {
		try {
			axios
				.get("/course/get-courses")
				.then(({data}) => dispatch(updateCourses(data.course)));

			axios
				.get("/user/get-users")
				.then(({data}) => dispatch(updateUsers(data.users)));

			axios
				.get("/instructor/get-instructors")
				.then(({data}) => dispatch(updateInstructors(data.instructors)));
		} catch (error) {
			console.log(error);
		}
	}, []);

	const [date, setDate] = useState<Date | undefined>(new Date());
	return (
		<main className="w-full h-screen flex">
			<section className="w-[20%] h-full bg-slate-900 px-2 py-10">
				<SideNav />
			</section>
			<section className="w-[55%] h-full p-6 bg-slate-200 dark:bg-slate-800 flex flex-col gap-5">
				<DashBoardRoute />
			</section>
			<section className="w-[25%] h-full bg-slate-50 dark:bg-slate-900 p-6">
				<div className="w-full h-full flex flex-col items-center gap-5">
					<div className="w-full h-auto flex items-center justify-between">
						<Bell />
						<span className="flex gap-5">
							<div className="flex items-center justify-center">
								{theme === "light" ? (
									<Moon
										onClick={() => setTheme("dark")}
										className="cursor-pointer"
									/>
								) : (
									<Sun
										onClick={() => setTheme("light")}
										className="cursor-pointer"
									/>
								)}
							</div>
							<span>
								<h2 className="font-semibold text-lg">John Luther</h2>
								<p className="text-sm text-slate-600">xyz@gmail.com</p>
							</span>
							<Avatar>
								<AvatarImage alt="not found" src="/assets/random/team-1.jpg" />
								<AvatarFallback>A</AvatarFallback>
							</Avatar>
						</span>
					</div>
					<div className="w-fit h-auto">
						<Calendar
							mode="single"
							selected={date}
							onSelect={setDate}
							className="rounded-md border shadow-md"
						/>
					</div>
					<div className="w-full h-full flex flex-col gap-5">
						<div className="w-full h-1/2 flex gap-5">
							<div className="w-1/2 h-full bg-pink-400/60 rounded-lg shadow-md flex gap-5 items-center justify-center flex-col">
								<div className="[clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] w-[100px] h-[100px] flex items-center justify-center bg-pink-600">
									<img
										src="/assets/icons/1710914636607.png"
										alt="icon"
										className="size-16 invert"
									/>
								</div>
								<span className="flex items-center justify-center flex-col">
									<h1 className="font-bold text-xl">Students</h1>
									<h3 className="font-semibold text-lg">{users.length}</h3>
								</span>
							</div>
							<div className="w-1/2 h-full bg-purple-400/80 rounded-lg shadow-md flex gap-5 items-center justify-center flex-col">
								<div className="[clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] w-[100px] h-[100px]  flex items-center justify-center bg-purple-600">
									<img
										src="/assets/icons/1710914636640.png"
										alt="icon"
										className="size-16 invert"
									/>
								</div>
								<span className="flex items-center justify-center flex-col">
									<h1 className="font-bold text-xl">Teacher</h1>
									<h3 className="font-semibold text-lg">
										{instructors.length}
									</h3>
								</span>
							</div>
						</div>
						<div className="w-full h-1/2 flex gap-5">
							<div className="w-1/2 h-full bg-blue-400/80 rounded-lg shadow-md flex gap-5 items-center justify-center flex-col">
								<div className="[clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] w-[100px] h-[100px]  flex items-center justify-center bg-blue-600">
									<img
										src="/assets/icons/1710914636630.png"
										alt="icon"
										className="size-16 invert"
									/>
								</div>
								<span className="flex items-center justify-center flex-col">
									<h1 className="font-bold text-xl">Courses</h1>
									<h3 className="font-semibold text-lg">{courses.length}</h3>
								</span>
							</div>
							<div className="w-1/2 h-full bg-yellow-400/60 rounded-lg shadow-md flex gap-5 items-center justify-center flex-col">
								<div className="[clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] w-[100px] h-[100px]  flex items-center justify-center bg-yellow-500">
									<img
										src="/assets/icons/1710914636618.png"
										alt="icon"
										className="size-16 invert"
									/>
								</div>
								<span className="flex items-center justify-center flex-col">
									<h1 className="font-bold text-xl">Placements</h1>
									<h3 className="font-semibold text-lg">1200</h3>
								</span>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Dashboard;
