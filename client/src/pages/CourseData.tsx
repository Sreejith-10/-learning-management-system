import Links from "@/components/ui/Links";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import {Progress} from "@/components/ui/progress";
import PageWrapper from "@/components/wrapper/PageWrapper";
import {useAppDispatch, useAppSelector} from "@/redux";
import {updateUser} from "@/redux/authSlice";
import {updateSingleCourse} from "@/redux/courseSlice";
import axios from "axios";
import {AlertTriangle, ArrowLeft, CheckCircle2} from "lucide-react";
import {useEffect, useState} from "react";
import {Link, Route, Routes, useLocation, useNavigate} from "react-router-dom";

const CourseData = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const {user} = useAppSelector((state) => state.auth);
	const {course} = useAppSelector((state) => state.course);
	const [route, setRoute] = useState("/course-data/");
	const location = useLocation();
	const id = location?.state;

	useEffect(() => {
		const fetch = () => {
			if (id) {
				axios
					.get("/course/get-single-course/" + id)
					.then(({data}) => dispatch(updateSingleCourse(data.course)))
					.catch((err) => console.log(err));
			}
		};

		fetch();
	}, [id]);

	const changeRoute = (path: string) => {
		setRoute(path);
		navigate(path);
	};

	return (
		<main className="w-full h-auto">
			<PageWrapper style={{flexDirection: "column"}}>
				<section className="w-full h-full mt-[100px] lg:mt-5">
					<Links />
					<div className="pt-10 pb-2">
						<Link
							to={"/my-courses"}
							className="w-fit flex items-center gap-2 justify-center">
							<ArrowLeft />
							Back
						</Link>
					</div>
					<div className="w-full flex gap-5 pt-4 pb-10">
						<div className="w-1/2">
							{course?.thumbnail ? (
								<img
									src={`http://localhost:8080/upload/${course?.thumbnail}`}
									className="rounded-md"
									alt="not found"
								/>
							) : (
								<img
									src="/assets/random/3.jpg"
									alt="not found"
									className="rounded-md"
								/>
							)}
						</div>
						<div className="w-1/2 space-y-5">
							<h1 className="text-[2rem] font-semibold">
								{course?.courseName}
							</h1>
							<span className="w-full flex gap-4 items-center justify-center text-lg font-semibold">
								<Progress
									value={
										user.courses?.find((item) => item.courseId === course._id)
											?.progress
									}
									indicatorColor="bg-emerald-500"
								/>
								{
									user.courses?.find((item) => item.courseId === course._id)
										?.progress
								}
								%
							</span>
							<h2 className="w-full p-2 text-center font-bold uppercase bg-slate-950 dark:bg-slate-700 text-white rounded-md">
								{
									user.courses.find((item) => item.courseId === course._id)
										?.status
								}
							</h2>
						</div>
					</div>
				</section>
				<section className="w-full py-10">
					<nav>
						<ul className="flex">
							<li
								onClick={() => changeRoute("/course-data/")}
								className={`font-semibold text-lg text-slate-600 cursor-pointer ${
									route === "/course-data/"
										? "border border-b-0 border-slate-400"
										: "border-b border-b-slate-400"
								} border-opacity-40 p-2 rounded-md`}>
								Overview
							</li>
							<li
								onClick={() => changeRoute("/course-data/curriculam")}
								className={`font-semibold text-lg text-slate-600 cursor-pointer ${
									route === "/course-data/curriculam"
										? "border border-b-0 border-slate-400"
										: "border-b border-b-slate-400"
								} border-opacity-40 p-2 rounded-md`}>
								Curriculam
							</li>
							<li
								onClick={() => changeRoute("/course-data/test-quiz")}
								className={`font-semibold text-lg text-slate-600 cursor-pointer ${
									route === "/course-data/test-quiz"
										? "border border-b-0 border-slate-400"
										: "border-b border-b-slate-400"
								} border-opacity-40 p-2 rounded-md`}>
								<Link to={"/course-data/test-quiz"}>Tests & Quizes</Link>
							</li>
							<li
								onClick={() => changeRoute("/course-data/notes")}
								className={`font-semibold text-lg text-slate-600 cursor-pointer ${
									route === "/course-data/notes"
										? "border border-b-0 border-slate-400"
										: "border-b border-b-slate-400"
								} border-opacity-40 p-2 rounded-md`}>
								<Link to={"/course-data/notes"}>Notes</Link>
							</li>
						</ul>
					</nav>
				</section>
				<section className="w-full h-auto py-4">
					<Routes>
						<Route path="/" element={<OverView />} />
						<Route path="/curriculam" element={<Curriculam />} />
						<Route path="/test-quiz" element={<TestAndQuiz />} />
						<Route path="/notes" element={<Notes />} />
					</Routes>
				</section>
			</PageWrapper>
		</main>
	);
};

export default CourseData;

const OverView = () => {
	const {course} = useAppSelector((state) => state.course);

	return (
		<div className="space-y-3">
			<h1 className="text-[2rem] font-semibold">{course?.courseName}</h1>
			<p className="font-medium text-lg">{course?.courseDescription}</p>
			<span className="space-y-3">Itroduction video</span>
		</div>
	);
};

const Curriculam = () => {
	const {course} = useAppSelector((state) => state.course);
	const {user} = useAppSelector((state) => state.auth);

	const dispatch = useAppDispatch();

	const clickHandler = async (id: string) => {
		const {data} = await axios.post(
			"/user/update-course-progress",
			{
				userId: user.userId,
				courseId: course._id,
				sessionId: id,
			},
			{headers: {"Content-Type": "application/json"}}
		);
		dispatch(updateUser(data.user));
	};

	return (
		<div>
			{course.sessions.map((item, index) => (
				<div className="pb-5" key={index}>
					<div className="w-full flex items-center justify-between">
						<h1 className="text-lg font-semibold">{item.sessionTitle}</h1>
						{user.courses
							.find((data) => data.courseId === course._id)
							?.sessionsCompleted.includes(item._id) ? (
							<Button className="bg-emerald-600 hover:bg-emerald-500 text-slate-100 flex gap-2 items-center">
								Completed
								<CheckCircle2 size={20} />
							</Button>
						) : (
							<Button
								onClick={() => clickHandler(item._id)}
								className="bg-transparent text-destructive border border-destructive hover:bg-destructive/10 flex gap-2 items-center">
								Not Completed
								<AlertTriangle size={20} />
							</Button>
						)}
					</div>
					{item?.sessionTopics?.map((topic, idx) => (
						<Accordion type="single" collapsible key={idx}>
							<AccordionItem value={topic?.topicTitle}>
								<AccordionTrigger className="font-[600]">
									#{idx + 1} {topic?.topicTitle}
								</AccordionTrigger>
								<AccordionContent className="space-y-5">
									<video
										controls
										controlsList="nodownload"
										width={600}
										src={topic?.topicVideo}></video>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					))}
				</div>
			))}
			<span className="">
				<h1 className="font-medium text-md">
					If you find the course intresting please feel to review and rate
				</h1>
				<Link
					to={`/review/${user.userId}/${course._id}`}
					className="font-medium text-blue-500">
					Rate the course
				</Link>
			</span>
		</div>
	);
};

const Notes = () => {
	return <div>News</div>;
};

const TestAndQuiz = () => {
	return <div>No new test or quiz</div>;
};
