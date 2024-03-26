import {CourseType, InstructorType} from "@/lib/types";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";
import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar";
import {Button} from "../ui/button";
import {useAppDispatch} from "@/redux";
import {updateCourses} from "@/redux/dashboardSlice";
import {useToast} from "../ui/use-toast";

const SingleCourse = () => {
	const location = useLocation();
	const [course, _setCourse] = useState<CourseType | undefined>(location.state);
	const [tutor, setTutor] = useState<InstructorType | undefined>();

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const {toast} = useToast();

	useEffect(() => {
		const fetchInstrucntor = async () => {
			const {data} = await axios.get(
				"/instructor/single-instructor/" + course?.courseInstructor
			);

			setTutor(data.instructor);
		};

		fetchInstrucntor();
	}, []);

	const removeHandler = async () => {
		try {
			const {data} = await axios.delete("/course/delete-course/" + course?._id);

			dispatch(updateCourses(data.data));
			toast({title: "Success", description: "Succesfully removed"});
			navigate("/dashboard/courses");
		} catch (error) {
			console.log(error);
			toast({title: "Error", description: "Something went wrong"});
		}
	};

	return (
		<div className="w-full h-full bg-white rounded-lg shadow-md p-4 space-y-5 dark:bg-slate-900 dark:border dark:border-slate-200 dark:border-opacity-20 overflow-y-scroll">
			<span className="flex justify-between items-center pb-4">
				<h1 className="font-bold text-2xl">{course?.courseName}</h1>
				<Link
					to={"/dashboard/courses"}
					className="bg-destructive dark:bg-red-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-destructive/80">
					Back
				</Link>
			</span>
			<div className="w-full h-auto">
				<div className="space-y-4">
					{course?.thumbnail ? (
						<img
							src={`http://localhost:8080/upload/${course.thumbnail}`}
							alt="not found"
							width={500}
							height={500}
						/>
					) : (
						<img
							src="/assets/random/5.jpg"
							alt="not found"
							width={500}
							height={500}
						/>
					)}
				</div>
				<div className="w-full py-4">
					<p className="font-medium">{course?.courseDescription}</p>
					<p>
						Course level <b>{course?.courseLevel}</b>
					</p>
					<p>
						Price : <b>{course?.coursePrice}</b>
					</p>
				</div>
				<div className="space-y-4 py-4">
					<h1 className="font-semibold text-lg">Instructor</h1>
					<span className="w-fit border border-slate-700 rounded-lg px-2 py-3 border-opacity-40 flex items-center gap-4">
						<Avatar>
							<AvatarFallback>{tutor?.fname?.charAt(0)}</AvatarFallback>
							<AvatarImage src="" alt="image" />
						</Avatar>
						<h2 className="font-semibold">
							{tutor?.fname} {tutor?.lname}
						</h2>
					</span>
					<h3 className="font-medium">{tutor?.role}</h3>
				</div>
				<div className="space-y-4">
					<h1 className="font-semibold text-lg">
						Topics covers in this course
					</h1>
					<div className="w-full grid grid-cols-2 gap-5">
						{course?.topics?.map((item, index) => (
							<span
								className="font-medium border border-slate-700 rounded-lg border-opacity-50 py-2 px-3"
								key={index}>
								{item}
							</span>
						))}
					</div>
				</div>
				<div className="space-y-4 py-4">
					<h1 className="font-semibold text-lg">Skills obtained</h1>
					<div className="w-full flex flex-wrap gap-5">
						{course?.skillsGain?.map((item, index) => (
							<span
								className="bg-slate-200 py-2 px-3 text-sm font-medium rounded-lg text-slate-800"
								key={index}>
								{item}
							</span>
						))}
					</div>
				</div>
				<div className="space-y-4 py-4">
					<h1 className="font-semibold text-lg">Sessions</h1>
					<div>
						{course?.sessions.map((session, index) => (
							<div className="space-y-4 py-4" key={index}>
								<h1 className="font-semibold text-lg">
									#{index + 1} {session?.sessionTitle}
								</h1>
								<p>{session?.sessionDescription}</p>
								<div className="space-y-4">
									{session.sessionTopics.map((topic, index) => (
										<div className="space-y-2" key={index}>
											<h1 className="font-semibold text-lg">
												{topic?.topicTitle}
											</h1>
											<video
												src={topic?.topicVideo}
												width={500}
												height={500}
												controls></video>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="space-y-4 flex items-center justify-between">
				<Button
					onClick={removeHandler}
					className="bg-destructive hover:bg-destructive dark:bg-red-600 dark:text-slate-200">
					Remove Course
				</Button>
				<Link
					to={"/dashboard/courses/edit-course"}
					state={course}
					className="bg-emerald-600 hover:bg-emerald-500 text-slate-200 dark:text-slate-200 px-3 py-2 rounded-md">
					Update Course
				</Link>
			</div>
		</div>
	);
};

export default SingleCourse;
