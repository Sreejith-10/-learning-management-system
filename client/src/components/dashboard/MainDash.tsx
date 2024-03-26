import {useAppSelector} from "@/redux";
import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar";
import {Link} from "react-router-dom";
import "../../index.css";

const MainDash = () => {
	const {users, courses, instructors} = useAppSelector(
		(state) => state.dashboard
	);

	return (
		<>
			<div className="w-full h-[250px] rounded-lg flex bg-white dark:bg-slate-900 dark:border dark:border-slate-200 dark:border-opacity-20 p-4 ">
				<div className="w-1/2 h-full  flex flex-col gap-5 items-start justify-center p-5">
					<h1 className="text-2xl">
						Welcome Back, <b>John!</b>
					</h1>
					<p className="text-slate-500">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
						mollitia nihil vitae nostrum veniam ut recusandae natus voluptatibus
						nobis! Qui.
					</p>
				</div>
				<div className="w-1/2 h-full rounded-lg">
					<img
						className="w-full h-full rounded-lg"
						src="/assets/istockphoto-1394658823-612x612.jpg"
						alt="not found"
					/>
				</div>
			</div>
			<div className="w-full h-auto flex items-center justify-center gap-5 ">
				<div className="w-1/2 h-[300px] bg-white rounded-lg shadow-md p-4 space-y-3 dark:bg-slate-900 dark:border dark:border-slate-200 dark:border-opacity-20">
					<div className="w-full flex items-center justify-between">
						<h1 className="font-bold">Students</h1>
						<p className="text-slate-500">View all</p>
					</div>
					<div className="w-full grid gap-5 overflow-y-scroll hide-scrollbar">
						{users.map((user, index) => (
							<div
								key={index}
								className="w-full flex items-center justify-between">
								<Avatar>
									<AvatarImage
										src="/assets/random/team-3.jpg"
										alt="not found"
									/>
									<AvatarFallback>{user?.userName[0]}</AvatarFallback>
								</Avatar>
								<h3 className="min-w-fit font-bold">{user?.userName}</h3>
								<h2 className="min-w-fit font-bold">{user?.userEmail}</h2>
							</div>
						))}
					</div>
				</div>
				<div className="w-1/2 h-[300px] bg-white hide-scrollbar rounded-lg shadow-md dark:bg-slate-900 dark:border dark:border-slate-200 dark:border-opacity-20">
					<div className="w-full h-full bg-white dark:bg-slate-900 dark:border dark:border-slate-200 dark:border-opacity-20 rounded-lg shadow-md p-4 space-y-3 overflow-y-scroll">
						<div className="w-full flex items-center justify-between">
							<h1 className="font-bold">Instrcutors</h1>
							<Link to={"/dashboard/instructors"} className="text-slate-600">
								View all
							</Link>
						</div>
						<div className="w-full grid gap-4 overflow-y-scroll hide-scrollbar">
							{instructors.map((instructor, index) => (
								<div
									key={index}
									className="w-full flex items-center justify-between">
									<Avatar>
										<AvatarImage
											src={`http://localhost:8080/upload/${instructor?.profileImage}`}
											alt="not found"
										/>
										<AvatarFallback>
											{instructor.fname.charAt(0)}
										</AvatarFallback>
									</Avatar>
									<h3 className="min-w-fit text-center font-bold">
										{instructor?.fname} {instructor?.lname}
									</h3>
									<h2 className="min-w-fit font-bold">{instructor?.role}</h2>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className="w-full h-[calc(100%-600px+20px)] flex items-center justify-center gap-5 hide-scrollbar">
				<div className="w-full h-full bg-white dark:bg-slate-900 dark:border dark:border-slate-200 dark:border-opacity-20 rounded-lg shadow-md p-4 space-y-3 overflow-y-scroll">
					<div className="w-full flex items-center justify-between">
						<h1 className="font-bold">All courses</h1>
						<Link to={"/dashboard/course-list"} className="text-slate-600">
							View all
						</Link>
					</div>
					<div className="w-full h-full space-y-3">
						{courses.map((course, index) => (
							<div
								key={index}
								className="w-full h-auto bg-slate-100 dark:bg-slate-700 flex items-center justify-between px-5 py-4 rounded-lg shadow-md">
								<span className="w-10 h-10 bg-blue-500/20 dark:text-slate-100 rounded-md text-xl font-semibold grid place-content-center text-blue-600">
									{course?.courseLevel?.charAt(0).toUpperCase()}
								</span>
								<h2 className="w-72 font-bold text-lg">{course?.courseName}</h2>
								<h3 className=" font-medium text-lg text-slate-800 dark:text-slate-300">
									{instructors.map((item) => {
										if (item._id === course.courseInstructor) {
											return item.fname + " " + item.lname;
										}
									})}
								</h3>
								<h3 className="font-medium text-destructive">Paid</h3>
								<h4 className="text-slate-600 dark:text-slate-200">
									{course.sessions?.length} sessions
								</h4>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default MainDash;
