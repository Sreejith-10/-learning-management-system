import {InstructorType} from "@/lib/types";
import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button} from "../ui/button";
import {useToast} from "../ui/use-toast";

const SingleInstructor = () => {
	const {id} = useParams();

	const navigate = useNavigate();
	const [instructor, setInstructor] = useState<InstructorType>();

	const {toast} = useToast();

	useEffect(() => {
		const fetchUser = async () => {
			const {data} = await axios.get(`/instructor/single-instructor/${id}`);
			setInstructor(data.instructor);
		};

		fetchUser();
	}, [id]);

	const removeInstructor = async () => {
		try {
			const id = instructor?._id;
			const {data} = await axios.delete(`/instructor/remove-instructor/${id}`);
			if (data) {
				toast({
					title: "Success",
					description: data.message,
				});
			}
			navigate(-1);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="w-full h-full bg-white rounded-lg shadow-md p-5 space-y-6 dark:bg-slate-900 dark:border dark:border-slate-200 dark:border-opacity-20">
			<div className="flex items-center justify-between">
				<h1>Instructor</h1>
				<Button
					className="bg-emerald-600 dark:text-slate-200"
					onClick={() => navigate(-1)}>
					Back
				</Button>
			</div>
			<div className="grid grid-cols-3">
				<div className="col-start-1 col-end-1">
					{instructor?.profileImage ? (
						<img
							src={`http://localhost:8080/upload/${instructor?.profileImage}`}
							alt="profile"
							width={200}
							height={200}
							className="rounded-full"
						/>
					) : (
						<img
							src="/assets/Default_pfp.svg.png"
							alt="profile"
							width={200}
							height={200}
							className="rounded-full"
						/>
					)}
				</div>
				<div className="flex items-start justify-center gap-5 flex-col">
					<h1>
						Name:{" "}
						<b>
							{instructor?.fname} {instructor?.lname}
						</b>
					</h1>
					<h1>
						Qualification: <b>{instructor?.qualification}</b>
					</h1>
					<h1>
						Institute: <b>{instructor?.institute}</b>
					</h1>
					<h1>
						Role: <b>{instructor?.role}</b>
					</h1>
				</div>
			</div>
			<div className="space-x-5">
				<Button
					onClick={removeInstructor}
					className="bg-destructive dark:bg-red-600 dark:text-slate-100">
					Remove
				</Button>
				<Button
					onClick={() =>
						navigate("/dashboard/instructors/edit-instructor", {
							state: instructor,
						})
					}
					className="bg-emerald-500 dark:bg-emerald-500-600 dark:text-slate-100">
					Edit
				</Button>
			</div>
		</div>
	);
};

export default SingleInstructor;
