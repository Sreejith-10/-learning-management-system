import {Link} from "react-router-dom";
import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar";
import {useEffect, useState} from "react";
import axios from "axios";
import {InstructorType} from "@/lib/types";
import {Skeleton} from "../ui/skeleton";
import "../../index.css";

const Instructors = () => {
	const [tutors, setTutors] = useState<InstructorType[]>([]);

	useEffect(() => {
		const fetch = async () => {
			try {
				axios
					.get("/instructor/get-instructors")
					.then(({data}) => setTutors(data.instructors));
			} catch (error) {
				console.log(error);
			}
		};

		fetch();
	}, []);

	return (
		<div className="w-full h-full bg-white rounded-lg shadow-md p-5 space-y-6 dark:bg-slate-900 dark:border dark:border-slate-200 dark:border-opacity-20 overflow-y-scroll hide-scrollbar">
			<div className="w-full flex items-center justify-between">
				<h1 className="font-bold text-2xl">Instrcutors</h1>
				<Link
					to={"/dashboard/instructors/new-instructor"}
					className="bg-blue-600 hover:bg-blue-400 text-white py-2 px-3 rounded-md font-semibold">
					Add New
				</Link>
			</div>
			<div className="w-full h-auto space-y-3">
				{tutors.length >= 1
					? tutors.map((u, i) => (
							<Link
								to={`/dashboard/instructors/single-instructor/${u._id}`}
								className="flex gap-5">
								<div
									key={i}
									className="w-full h-auto bg-slate-100 dark:bg-slate-700 flex items-center justify-between px-5 py-4 rounded-lg shadow-md">
									<Avatar className="size-12">
										<AvatarImage
											src={`http://localhost:8080/upload/${u.profileImage}`}
										/>
										<AvatarFallback>
											{u.fname[0]} {u.lname[0]}
										</AvatarFallback>
									</Avatar>
									<h3 className="w-[calc(100%-40%)] text-center font-semibold text-lg text-slate-800">
										{u.fname + " " + u.lname}
									</h3>
									<h3 className="w-[calc(100%-40%)] text-center text-slate-600 font-normal">
										{u.qualification}
									</h3>
									<h4 className="w-[calc(100%-40%)] text-center text-slate-600 font-semibold">
										{u.institute}
									</h4>
									<p className="w-[10%] text-emerald-500">
										{u.experience} Year
									</p>
								</div>
							</Link>
					  ))
					: Array(9)
							.fill("")
							.map((_item, key) => (
								<Skeleton
									key={key}
									className="w-full h-auto flex items-center justify-between px-5 py-4 rounded-lg shadow-md">
									<Skeleton className="size-12 rounded-full bg-slate-300"></Skeleton>
									<Skeleton className="w-[400px] h-[50px] bg-slate-300"></Skeleton>
									<Skeleton className="w-[300px] h-[50px] bg-slate-300 text-center text-slate-600 font-normal"></Skeleton>
									<div className="w-[100px] h-[50px] flex flex-col gap-3">
										<Skeleton className="w-[100%] h-[50%] bg-slate-300 text-center text-slate-600 font-semibold"></Skeleton>
										<Skeleton className="w-[100%] h-1/2 bg-slate-300 text-center text-slate-600 font-semibold"></Skeleton>
									</div>
								</Skeleton>
							))}
			</div>
		</div>
	);
};

export default Instructors;
