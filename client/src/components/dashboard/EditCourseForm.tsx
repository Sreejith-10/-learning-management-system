import {ChangeEvent, useEffect, useState} from "react";
import {Input} from "../ui/input";
import {Label} from "../ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import {Button} from "../ui/button";
import "@/App.css";
import {Textarea} from "../ui/textarea";
import axios from "axios";
import {InstructorType} from "@/lib/types";
import {LucideTrash} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import {useToast} from "../ui/use-toast";
import "../../index.css";

type DefaultValues = {
	courseName: string;
	courseDescription: string;
	courseDuration: number;
	courseInstructor: string;
	topics: string[];
	courseLevel: "beginner" | "ametuer" | "expert";
	skillsGain: string[];
	coursePrice: string;
	thumbnail: File | null;
	sessions: {
		sessionTitle: string;
		sessionDescription: string;
		sessionDuration: number;
		sessionTopics: [{topicTitle: string; topicVideo: string}];
	}[];
};

const EditCourseForm = () => {
	const [tutor, setTutor] = useState<InstructorType[]>([]);
	const {toast} = useToast();
	const navigate = useNavigate();
	const [formData, setFormData] = useState<DefaultValues>({
		courseName: "",
		courseDescription: "",
		courseDuration: 0,
		courseInstructor: "",
		topics: [""],
		courseLevel: "beginner",
		skillsGain: [""],
		coursePrice: "",
		thumbnail: null,
		sessions: [
			{
				sessionTitle: "",
				sessionDescription: "",
				sessionDuration: 0,
				sessionTopics: [{topicTitle: "", topicVideo: ""}],
			},
		],
	});

	useEffect(() => {
		try {
			axios
				.get("/instructor/get-instructors")
				.then(({data}) => setTutor(data.instructors));
		} catch (error) {
			console.log(error);
		}
	}, []);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
		sessionIndex?: number,
		topicIndex?: number
	) => {
		const {name, value} = e.target;

		if (name === "sessionTitle" || name === "sessionDescription") {
			const updatedSessions = [...formData.sessions];
			if (sessionIndex !== undefined) {
				updatedSessions[sessionIndex][name] = value;
				setFormData({...formData, sessions: updatedSessions});
			}
		} else if (name === "topicTitle" || name === "topicVideo") {
			const updatedSessions = [...formData.sessions];
			if (sessionIndex !== undefined && topicIndex !== undefined) {
				updatedSessions[sessionIndex].sessionTopics[topicIndex][name] = value;
				value;
				setFormData({...formData, sessions: updatedSessions});
			}
		} else if (name === "thumbnail") {
			if (e.target instanceof HTMLInputElement) {
				if (e.target?.files && e.target?.files.length > 0) {
					setFormData({...formData, thumbnail: e.target?.files[0]});
				}
			}
		} else {
			setFormData({...formData, [name]: value});
		}
	};

	const levelChange = (level: string) => {
		setFormData({
			...formData,
			courseLevel: level as "beginner" | "ametuer" | "expert",
		});
	};

	const instructorChange = (i: string) => {
		setFormData({
			...formData,
			courseInstructor: i,
		});
	};

	const addSession = () => {
		setFormData({
			...formData,
			sessions: [
				...formData.sessions,
				{
					sessionTitle: "",
					sessionDescription: "",
					sessionDuration: 0,
					sessionTopics: [{topicTitle: "", topicVideo: ""}],
				},
			],
		});
	};

	const removeSession = (index: number) => {
		const updatedSessions = [...formData.sessions];
		updatedSessions.splice(index, 1);
		setFormData({...formData, sessions: updatedSessions});
	};

	const addTopic = (sessionIndex: number) => {
		const updatedSessions = [...formData.sessions];
		updatedSessions[sessionIndex].sessionTopics.push({
			topicTitle: "",
			topicVideo: "",
		});
		setFormData({...formData, sessions: updatedSessions});
	};

	const removeTopic = (sessionIndex: number, topicIndex: number) => {
		const updatedSessions = [...formData.sessions];
		updatedSessions[sessionIndex].sessionTopics.splice(topicIndex, 1);
		setFormData({...formData, sessions: updatedSessions});
	};

	const handleSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			const skill = e.currentTarget.value.trim();
			if (skill) {
				setFormData({...formData, skillsGain: [...formData.skillsGain, skill]});
				e.currentTarget.value = "";
			}
		}
	};

	const removeSkill = (v: string) => {
		setFormData({
			...formData,
			skillsGain: formData.skillsGain.filter((item) => item !== v),
		});
	};

	const topicChange = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			const topic = e.currentTarget.value.trim();
			if (topic) {
				setFormData({...formData, topics: [...formData.topics, topic]});
				e.currentTarget.value = "";
			}
		}
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			const response = await axios.post("/course/add-course", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			console.log(response.data.message);
			if (response.data.message) {
				toast({
					title: "New course addes",
					description: "Succesfully added new course",
				});
				navigate("/dashboard/courses/course-list");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="w-full h-full bg-white rounded-lg shadow-md p-5 overflow-y-auto dark:bg-slate-900 dark:border dark:border-slate-200 dark:border-opacity-20 hide-scrollbar">
			<span className="flex justify-between items-center pb-4">
				<h1 className="font-bold text-2xl">Course Details</h1>
				<Link
					to={"/dashboard/courses"}
					className="bg-destructive text-white py-2 px-4 rounded-md font-semibold hover:bg-destructive/80">
					Back
				</Link>
			</span>
			<form
				onSubmit={handleSubmit}
				encType="mulitpart/form-data"
				className="w-full h-full space-y-5">
				<div className="w-full h-auto relative space-y-0">
					<Input
						type="text"
						name="courseName"
						value={formData.courseName}
						onChange={(e) => handleChange(e)}
						required
						className="input-area bg-transparent"
					/>
					<Label className="absolute pointer-events-none ease-in-out delay-100 duration-200 text-sm font-bold top-1/2 left-3 -translate-y-1/2 label-text">
						Course Name
					</Label>
				</div>

				<div className="w-auto h-auto relative space-y-0">
					<Textarea
						name="courseDescription"
						value={formData.courseDescription}
						onChange={(e) => handleChange(e)}
						required
						className="input-area bg-transparent"
					/>
					<Label className="absolute pointer-events-none ease-in-out delay-100 duration-200 text-sm font-bold top-4 left-3 -translate-y-1/2 label-text">
						Course Description
					</Label>
				</div>

				<div>
					<Label className="text-sm font-bold">Thumbnail</Label>
					<Input
						className="bg-slate-100 dark:bg-slate-900 placeholder:text-slate-100"
						type="file"
						accept="image/"
						name="thumbnail"
						onChange={(e) => handleChange(e)}
					/>
				</div>

				<div className="w-auto h-auto relative space-y-0">
					<Input
						type="number"
						name="courseDuration"
						value={formData.courseDuration}
						onChange={(e) => handleChange(e)}
						required
						className="input-area bg-transparent"
					/>
					<Label className="absolute pointer-events-none ease-in-out delay-100 duration-200 text-sm font-bold top-1/2 left-3 -translate-y-1/2 label-text">
						Course Duration In Hours
					</Label>
				</div>
				<div>
					<Select onValueChange={instructorChange}>
						<SelectTrigger className="dark:bg-slate-900">
							<SelectValue placeholder="Instructor" />
						</SelectTrigger>
						<SelectContent>
							{tutor.map((item, id) => (
								<SelectItem value={item._id} key={id} className="flex">
									<p className="font-bold">{item.fname + " " + item.lname}</p>
									<p>{item.role}</p>
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="w-auto h-auto relative space-y-0">
					<Textarea
						className="input-area bg-transparent"
						onKeyDown={topicChange}
					/>
					<Label className="absolute pointer-events-none ease-in-out delay-100 duration-200 text-sm font-bold top-4 left-3 -translate-y-1/2 label-text">
						Topics in this course
					</Label>
				</div>

				<div className="w-full">
					<ul className="w-full flex flex-col space-y-3">
						{formData?.topics?.map(
							(k, id) =>
								k !== "" && (
									<li
										key={id}
										className="w-full shadow-md border border-slate-300 rounded-lg p-1">
										<span className="flex items-center justify-between rounded-lg">
											<p className="font-bold pl-2 text-sm text-slate-600">
												{k}
											</p>
											<Button
												onClick={() =>
													setFormData({
														...formData,
														topics: formData.topics.filter(
															(item) => item !== k
														),
													})
												}
												className="bg-destructive hover:bg-destructive/80 dark:text-slate-100">
												Remove
											</Button>
										</span>
									</li>
								)
						)}
					</ul>
				</div>

				<div>
					<Select onValueChange={levelChange}>
						<SelectTrigger className="dark:bg-slate-900">
							<SelectValue placeholder="Select Course Level" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="beginner">Beginner</SelectItem>
							<SelectItem value="intermediate">Intermedaite</SelectItem>
							<SelectItem value="expert">Expert</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="w-auto h-auto relative space-y-0">
					<Input
						type="text"
						onKeyDown={handleSkill}
						className="input-area bg-transparent"
					/>
					<Label className="absolute pointer-events-none ease-in-out delay-100 duration-200 text-sm font-bold top-1/2 left-3 -translate-y-1/2 label-text">
						Skills Gain
					</Label>
				</div>

				<div className="w-full">
					<ul className="w-full flex flex-wrap items-center justify-start gap-5">
						{formData?.skillsGain?.map(
							(k, id) =>
								k !== "" && (
									<li
										key={id}
										className="w-fit shadow-md border border-slate-300 rounded-lg p-1 cursor-pointer">
										<span className="flex items-center justify-between gap-3 rounded-lg">
											<p className="font-bold pl-2 text-sm text-slate-600">
												{k}
											</p>
											<LucideTrash
												onClick={() => removeSkill(k)}
												className="text-destructive"
											/>
										</span>
									</li>
								)
						)}
					</ul>
				</div>

				<div className="w-auto h-auto relative space-y-0">
					<Input
						type="text"
						name="coursePrice"
						onChange={(e) => handleChange(e)}
						required
						className="input-area bg-transparent"
					/>

					<Label className="absolute pointer-events-none ease-in-out delay-100 duration-200 text-sm font-bold top-1/2 left-3 -translate-y-1/2 label-text">
						Course Price
					</Label>
				</div>

				<h1 className="font-bold text-2xl">Course Sessions</h1>

				{formData.sessions.map((session, sessionIndex) => (
					<div key={sessionIndex} className="w-full h-auto space-y-5">
						<h1 className="font-bold text-lg">Session #{sessionIndex + 1}</h1>
						<div className="w-auto h-auto relative space-y-0">
							<Input
								type="text"
								name="sessionTitle"
								value={session.sessionTitle}
								onChange={(e) => handleChange(e, sessionIndex)}
								required
								className="input-area bg-transparent"
							/>

							<Label className="absolute pointer-events-none ease-in-out delay-100 duration-200 text-sm font-bold top-1/2 left-3 -translate-y-1/2 label-text">
								Session Title
							</Label>
						</div>
						<div className="w-auto h-auto relative space-y-0">
							<Textarea
								name="sessionDescription"
								value={session.sessionDescription}
								onChange={(e) => handleChange(e, sessionIndex)}
								required
								className="input-area bg-transparent"
							/>
							<Label className="absolute pointer-events-none ease-in-out delay-100 duration-200 text-sm font-bold top-4 left-3 -translate-y-1/2 label-text">
								Session Description
							</Label>
						</div>
						<div className="w-auto h-auto relative space-y-0">
							<Input
								type="number"
								name="sessionDuration"
								onChange={(e) => handleChange(e, sessionIndex)}
								required
								className="input-area bg-transparent"
							/>

							<Label className="absolute pointer-events-none ease-in-out delay-100 duration-200 text-sm font-bold top-1/2 left-3 -translate-y-1/2 label-text">
								Session Duration In Hours
							</Label>
						</div>
						<h1 className="font-bold text-2xl">Session Topics</h1>
						{session.sessionTopics.map((topic, topicIndex) => (
							<div key={topicIndex} className="w-full space-y-5">
								<h1 className="font-bold text-lg">Topic #{topicIndex + 1}</h1>
								<div className="w-full h-fit space-y-0 flex flex-row items-center justify-center gap-5">
									<div className="w-full h-auto relative">
										<Input
											type="text"
											name="topicTitle"
											value={topic.topicTitle}
											required
											className="w-full input-area bg-transparent"
											onChange={(e) =>
												handleChange(e, sessionIndex, topicIndex)
											}
										/>
										<Label className="absolute pointer-events-none ease-in-out delay-100 duration-200 text-sm font-bold top-1/2 left-3 -translate-y-1/2 label-text">
											Topic Title
										</Label>
									</div>
									<div className="w-full h-auto relative">
										<Input
											type="text"
											name="topicVideo"
											value={topic.topicVideo}
											required
											className="w-full input-area bg-transparent"
											onChange={(e) =>
												handleChange(e, sessionIndex, topicIndex)
											}
										/>
										<Label className="absolute pointer-events-none ease-in-out delay-100 duration-200 text-sm font-bold top-1/2 left-3 -translate-y-1/2 label-text">
											Topic Video
										</Label>
									</div>
									<Button
										type="button"
										className="float-start bg-destructive hover:bg-destructive/80 dark:text-slate-100"
										onClick={() => removeTopic(sessionIndex, topicIndex)}>
										Remove Topic
									</Button>
								</div>
							</div>
						))}
						<Button
							className="w-auto bg-green-600 hover:bg-green-800 dark:text-slate-100"
							type="button"
							onClick={() => addTopic(sessionIndex)}>
							Add Topic
						</Button>
						<div>
							<Button
								className="float-start bg-destructive hover:bg-destructive/80 dark:text-slate-100"
								onClick={() => removeSession(sessionIndex)}
								type="button">
								Remove Session
							</Button>
						</div>
					</div>
				))}

				<div className="w-full flex gap-5 py-5">
					<Button
						className="w-full bg-green-600 hover:bg-green-800 dark:text-slate-100"
						type="button"
						onClick={addSession}>
						Add Session
					</Button>
					<Button
						className="w-full bg-blue-600 hover:bg-blue-400 dark:text-slate-100"
						type="submit">
						Submit
					</Button>
				</div>
			</form>
		</div>
	);
};

export default EditCourseForm;
