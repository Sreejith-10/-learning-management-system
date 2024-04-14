import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import PageWrapper from "@/components/wrapper/PageWrapper";
import {CourseType, InstructorType, ReviewType} from "@/lib/types";
import {AvatarFallback} from "@radix-ui/react-avatar";
import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {loadStripe} from "@stripe/stripe-js";
import {useAppSelector} from "@/redux";
import Links from "@/components/ui/Links";
import {useToast} from "@/components/ui/use-toast";
import RatingAndReview from "@/components/RatingAndReview";

const CourseDetails = () => {
	const [course, setCourse] = useState<CourseType>();
	const [tutor, setTutor] = useState<InstructorType>();
	const [courseReviews, setCourseReviews] = useState<ReviewType>();
	const {id} = useParams();
	const {isLogged} = useAppSelector((state) => state.auth);
	const {user} = useAppSelector((state) => state.auth);

	const navigate = useNavigate();
	const {toast} = useToast();

	useEffect(() => scrollTo(0, 0), []);

	const fetchData = async () => {
		const {data} = await axios.get("/course/get-single-course/" + id);
		setCourse(data.course);

		if (data) {
			axios
				.get("/instructor/single-instructor/" + data.course?.courseInstructor)
				.then(({data}) => setTutor(data.instructor));

			axios
				.get("/review/get-review/" + id)
				.then(({data}) => setCourseReviews(data.reviews));
		}
	};

	useEffect(() => {
		try {
			fetchData();
		} catch (error) {
			console.log(error);
		}
	}, [id]);

	const scrollToView = (view: string) => {
		const sectionElemnt = document.getElementById(view);
		if (sectionElemnt) {
			sectionElemnt.scrollIntoView({behavior: "smooth"});
		}
	};

	const enrollForCoruse = async () => {
		try {
			if (!isLogged) return navigate("/login");

			const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);

			const response = await axios.post(
				"/stripe/checkout-course",
				{course, user: user.userId},
				{headers: {"Content-Type": "application/json"}}
			);

			const result = await stripe?.redirectToCheckout({
				sessionId: response.data.id,
			});

			if (result?.error) {
				console.log(result.error);
			}
		} catch (error: any) {
			toast({title: "Failed", description: error.response.data.message});
			console.log(error);
		}
	};

	return (
		<main className="w-full h-full">
			<section className="w-full h-auto flex items-center sm:justify-center mt-[150px] sm:mt-10 md:mt-10 bg-blue-100 dark:bg-blue-500/10">
				<div className="w-full mx-[15%] xl:mx-[5%] sm:mx-[5%] lg:mx-[10%]">
					<div className="pt-4">
						<Links />
					</div>
					<div className="w-full h-full relative">
						<div className="w-[60%] h-full py-10 flex flex-col gap-4 items-start justify-center">
							<h1 className="text-6xl sm:text-2xl text-wrap">
								{course?.courseName}
							</h1>
							<p className="font-semibold sm:text-sm text-slate-800 dark:text-slate-400">
								{course?.courseDescription}
							</p>
							<Button
								onClick={enrollForCoruse}
								className="bg-blue-700 hover:bg-blue-500 p-6 dark:text-slate-200">
								Enroll now <br />
							</Button>
							<h4>{course?.studentsEnrolled} already enrolled</h4>
						</div>
						<div className="bg-white w-[40%] sm:w-full absolute h-fit top-0 right-1 sm:relative sm:mb-5 rounded-md shadow-md flex flex-col gap-5 items-start px-6 py-4">
							<span className="border-b-2 border-slate-300 mb-2">
								<h2 className=" text-start font-bold dark:text-slate-700">
									Professional Cirtificatie - {course?.sessions.length} Course
									series
								</h2>
							</span>
							<span>
								<h2 className="text-start font-bold dark:text-slate-700">
									4.5 Reviews
								</h2>
							</span>
							<span>
								<h2 className="text-start font-bold dark:text-slate-700">
									{course?.courseLevel} level
								</h2>
								<p className="text-sm text-slate-600 mb-1 dark:text-slate-700">
									No prior experience needed
								</p>
							</span>
							<span>
								<h2 className="text-start font-bold dark:text-slate-700">
									Flexible schedule
								</h2>
								<p className="text-sm text-slate-600 mb-1">
									Learn at your own place
								</p>
							</span>
						</div>
					</div>
				</div>
			</section>
			<section className="w-full h-auto">
				<PageWrapper style={{flexDirection: "column"}}>
					<div className="w-[70%] sm:w-full lg:w-full md:w-full">
						<div className="w-full h-16 flex items-center sm:flex-wrap sm:gap-3 gap-10 border-b-2 sm:my-2 border-slate-400">
							<p
								onClick={() => scrollToView("about")}
								className="pl-2 text-slate-800 font-semibold hover:text-blue-700 dark:text-slate-200">
								About
							</p>
							<p
								onClick={() => scrollToView("skills")}
								className="pl-2 text-slate-800 font-semibold hover:text-blue-700 dark:text-slate-200">
								Skills
							</p>
							<p
								onClick={() => scrollToView("sessions")}
								className="pl-2 text-slate-800 font-semibold hover:text-blue-700 dark:text-slate-200">
								Sessions
							</p>
							<p
								onClick={() => scrollToView("testimonials")}
								className="pl-2 text-slate-800 font-semibold hover:text-blue-700 dark:text-slate-200">
								Testimonials
							</p>
						</div>
						<section className="w-full h-auto py-2 sm:py-0" id="about">
							<div className="w-full py-5 sm:py-2">
								<h1 className="font-semibold pl-2 text-xl">
									What will you learn
								</h1>
							</div>

							<div className="w-full h-auto flex items-start gap-5 flex-wrap sm:flex-col">
								{course?.topics?.map((item, id) => {
									if (item != "") {
										return (
											<span
												key={id}
												className="w-[40%] sm:w-full h-auto flex items-start gap-3 px-2 py-3 border border-slate-500 border-opacity-30 rounded-md gird place-content-center">
												<b>{id + 1}</b>
												<p className="font-semibold text-slate-600 text-sm">
													{item}
												</p>
											</span>
										);
									}
								})}
							</div>
						</section>
						<section className="w-full h-auto py-5 sm:py-2" id="skills">
							<div className="w-full py-5 sm:py-2">
								<h1 className="font-semibold pl-2 text-xl">Skills you gain</h1>
							</div>
							<div className="w-full flex flex-wrap gap-5 pl-2">
								{course?.skillsGain?.map((item, id) => {
									if (item !== "") {
										return (
											<span
												key={id}
												className="px-3 py-1 bg-slate-200 dark:bg-slate-500 dark:text-slate-50 text-slate-700 text-sm font-medium rounded-lg">
												{item}
											</span>
										);
									}
								})}
							</div>
						</section>
						<section className="w-full h-auto py-5" id="sessions">
							<div className="w-full py-5">
								<h1 className="font-semibold pl-2 text-xl">
									Specialisation - {course?.sessions.length} Courses{" "}
								</h1>
							</div>
						</section>
					</div>
					<section
						className="w-full h-auto flex sm:flex-col sm:gap-5 md:gap-5 justify-between py-5"
						id="testimonials">
						<div className="w-[60%] sm:w-full md:w-full border border-slate-500 border-opacity-40 rounded-md p-5">
							<Accordion type="single" collapsible>
								{course?.sessions.map((item, idx) => (
									<AccordionItem value={item.sessionTitle} key={idx}>
										<AccordionTrigger>
											<div className="w-full flex flex-col items-start gap-3">
												<h2 className="font-bold">{item.sessionTitle}</h2>
												<p className="text-slate-600">
													{item.sessionDuration} hr
												</p>
											</div>
										</AccordionTrigger>
										<AccordionContent>
											<div className="w-full flex items-start flex-col gap-3">
												<p className="font-bold text-[18px]">
													{item.sessionDescription}
												</p>

												<div>
													<ul className="list-decimal">
														{item.sessionTopics.map((topic, index) => (
															<li
																key={index}
																className="font-semibold text-slate-700 dark:text-slate-500">
																{index + 1}. {topic.topicTitle}
															</li>
														))}
													</ul>
												</div>
											</div>
										</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						</div>
						<div className="w-[30%] sm:w-full md:w-full h-fit border border-slate-500 border-opacity-40 rounded-md p-5">
							<div className="w-full px-2 py-5 pl-4">
								<h2 className="font-semibold text-lg">Instructor</h2>
							</div>
							<div className="w-full h-auto flex items-start justify-evenly">
								<div className="w-[10%] h-full">
									<Avatar className="bg-blue-700">
										<AvatarFallback className="w-full h-full text-white flex text-center items-center justify-center">
											{tutor?.fname[0]}
										</AvatarFallback>
										<AvatarImage
											src={`http://localhost:8080/upload/${tutor?.profileImage}`}
											alt="avatar"
										/>
									</Avatar>
								</div>
								<div className="w-auto h-auto flex flex-col gap-2">
									<h2 className="w-fit px-2 rounded-md font-bold bg-blue-500/50 text-blue-700 dark:text-slate-100">
										Top Instructor
									</h2>
									<h2 className="font-bold text-lg">
										{tutor?.fname + " " + tutor?.lname}
									</h2>
									<p className="font-medium text-slate-600">
										{tutor?.institute}
									</p>
									<p className="font-medium text-sm text-slate-700">
										43 courses | 74,450,5050 learners
									</p>
								</div>
							</div>
						</div>
					</section>
					{courseReviews?.reviews[0] ? (
						<RatingAndReview courseReview={courseReviews} />
					) : (
						"no reviews"
					)}
				</PageWrapper>
			</section>
		</main>
	);
};

export default CourseDetails;
