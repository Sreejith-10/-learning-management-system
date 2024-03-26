import EducationForm from "@/components/forms/EducationForm";
import Experience from "@/components/forms/ExperienceForm";
import WorkPreferenceForm from "@/components/forms/WorkPreferenceForm";
import Links from "@/components/ui/Links";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import PageWrapper from "@/components/wrapper/PageWrapper";
import {useAppDispatch, useAppSelector} from "@/redux";
import {updateData} from "@/redux/dataSlice";
import axios from "axios";
import {
	Info,
	Laptop,
	LinkIcon,
	Locate,
	LocateOff,
	Pencil,
	Plus,
	User,
} from "lucide-react";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const Account = () => {
	const dispatch = useAppDispatch();
	const {user} = useAppSelector((state) => state.auth);
	const [showForm, setShowForm] = useState<boolean>(false);
	const [showWorkForm, setShowWorkForm] = useState<boolean>(false);
	const [showEducationForm, setShowEducationForm] = useState<boolean>(false);
	const [itemIndex, setItemIndex] = useState<number | undefined>();

	useEffect(() => {
		scrollTo(0, 0);
	}, []);

	useEffect(() => {
		try {
			axios
				.get("/public/get-data")
				.then(({data}) => dispatch(updateData(data.data[0])));
		} catch (error) {
			console.log(error);
		}
	});

	return (
		<main className="w-full h-screen sm:h-auto bg-slate-200/50 dark:bg-slate-900/90 mt-[80px] sm:mt-0 relative">
			<div className="mx-[15%] pt-[50px] pb-5 p-5">
				<Links />
			</div>
			<PageWrapper>
				<div className="w-full h-auto flex sm:flex-col">
					<section className="w-[25%] sm:w-full md:w-full lg:w-full h-auto p-5 space-y-5">
						<div className="w-full h-auto px-5 py-8 bg-white dark:bg-slate-900 dark:border dark:border-slate-200 dark:border-opacity-20 rounded-md shadow-md flex flex-col gap-5 items-center justify-center">
							<h2 className="font-semibold text-lg">Personl Details</h2>
							<Avatar className="w-32 h-32">
								<AvatarImage src="/assets/Default_pfp.svg.png" />
								<AvatarFallback>2</AvatarFallback>
							</Avatar>
							<h2 className="font-semibold text-xl">{user?.userName}</h2>
							<span className="flex items-center justify-center gap-5 border-[2px] border-blue-600 rounded-md py-3 px-4">
								<LinkIcon className="text-blue-600" />
								<Link to={"#"} className="text-blue-600 font-bold text-sm">
									Share Profile Link
								</Link>
							</span>
						</div>
						{user?.workPreference ? (
							<div className="w-full h-auto relative px-5 py-8 bg-white dark:bg-slate-900 dark:border dark:border-slate-200 dark:border-opacity-20 rounded-md shadow-md flex flex-col gap-5 items-start justify-evenly">
								<Pencil
									onClick={() => setShowWorkForm(true)}
									size={20}
									className="text-blue-500 absolute top-3 right-4"
								/>
								<h2 className="font-semibold text-lg">Work Preferences</h2>
								<p className="text-base font-semibold">Desired role</p>
								<span className="flex items-center justify-center gap-2">
									<User />
									<h2 className="text-slate-500 font-medium text-center">
										{user?.workPreference?.role}
									</h2>
								</span>
								<p className="text-base font-semibold">Location prefrence</p>
								{user?.workPreference?.workRemote ? (
									<span className="flex items-center justify-center gap-2">
										<Laptop />
										<h2 className="text-slate-500 font-medium">
											Open to work remote
										</h2>
									</span>
								) : (
									<span className="flex items-center justify-center gap-2">
										<Laptop />
										<h2 className="text-slate-500 font-medium">
											Not open to work remote
										</h2>
									</span>
								)}
								{user?.workPreference?.relocate ? (
									<span className="flex items-center justify-center gap-2">
										<Locate />
										<h2 className="text-slate-500 font-medium">
											Willing to relocate
										</h2>
									</span>
								) : (
									<span className="flex items-center justify-center gap-2">
										<LocateOff />
										<h2 className="text-slate-500 font-medium">
											Not willing to relocate
										</h2>
									</span>
								)}
							</div>
						) : (
							<div className="w-full h-auto px-5 py-8 bg-white dark:bg-slate-900 dark:border dark:border-slate-200 dark:border-opacity-20 rounded-md shadow-md flex flex-col gap-5 items-center justify-evenly">
								<h2 className="font-semibold text-lg">Work Preferences</h2>
								<p className="text-sm font-medium text-slate-500">
									Add your work prefrence to get a prefect job
								</p>
								<Button
									onClick={() => setShowWorkForm(true)}
									className="bg-blue-700 hover:bg-blue-500">
									Add Work Preference
								</Button>
							</div>
						)}
					</section>
					<section className="w-[75%] sm:w-full h-auto p-5 space-y-5">
						<h1 className="font-semibold text-lg">Experience</h1>

						{user?.workExperience?.length != 0 ? (
							<div className="w-full h-auto bg-white dark:bg-slate-900 dark:border dark:border-slate-200 dark:border-opacity-20 rounded-md shadow-md p-5 space-y-5">
								<div className="flex items-center justify-between">
									<span className="flex items-center gap-3">
										<h2 className="font-medium">Work Histroy</h2>
										<Info size={20} className="text-blue-600" />
									</span>
									<Button
										onClick={() => setShowForm(true)}
										className="bg-blue-600 hover:bg-blue-500">
										Add
									</Button>
								</div>
								{user?.workExperience?.map((item, idx) => (
									<div
										className="w-full h-auto flex items-start justify-between pb-3"
										key={idx}>
										<div className="flex flex-col items-start justify-start gap-2">
											<span className="flex items-center justify-center gap-3">
												<h2 className="font-semibold">
													{item?.role} at {item?.company}
												</h2>
												<p className="text-slate-600 font-medium text-sm">
													( {item?.startMonth + " " + item?.startYear} -{" "}
													{item?.currentlyWorking
														? "Present"
														: item?.endMonth + " " + item?.endYear}
													)
												</p>
											</span>
											<p className="font-medium text-slate-600 text-[14px]">
												{item?.description}
											</p>
										</div>
										<div>
											<Pencil
												size={20}
												className="text-blue-600 cursor-pointer"
												onClick={() => {
													setItemIndex(idx);
													setShowForm(true);
												}}
											/>
										</div>
									</div>
								))}
							</div>
						) : (
							<div className="w-full h-auto bg-white dark:bg-slate-900 dark:border dark:border-slate-200 dark:border-opacity-20 rounded-md shadow-md p-5 space-y-3">
								<span className="flex items-center gap-3">
									<h2 className="font-medium">Work Histroy</h2>
									<Info size={20} className="text-blue-600" />
								</span>
								<div className="w-full h-auto bg-slate-200/60 dark:bg-slate-800 rounded-md flex items-center justify-between p-2">
									<div className="w-[70%]">
										<p className="text-sm font-medium text-slate-600 dark:text-slate-300">
											Add your past work experience here. If yours just starting
											out, you can add insternships or volunteer experience
											instead
										</p>
									</div>
									<div
										className="w-[30%] flex items-center justify-center p-2 dark:text-slate-700"
										onClick={() => setShowForm(true)}>
										<span className="w-[230px] cursor-pointer flex items-center justify-center gap-2 bg-white dark:bg-slate-700 dark:text-slate-700 border-[2px] border-blue-600 dark:border-slate-400 rounded-md">
											<Plus className="text-blue-600 dark:text-slate-300" />
											<Button className="bg-inherit text-blue-600 dark:text-slate-300 hover:bg-inherit">
												Add work experience
											</Button>
										</span>
									</div>
								</div>
							</div>
						)}

						<h1 className="font-semibold text-lg">Education</h1>
						<div className="w-full h-auto bg-white dark:bg-slate-900 dark:border dark:border-slate-200 dark:border-opacity-20 rounded-md shadow-md p-5 space-y-3">
							<div className="flex justify-between items-center">
								<span className="flex items-center gap-3">
									<h2 className="font-medium">Credentials</h2>
									<Info size={20} className="text-blue-600" />
								</span>
								{user.education?.length > 1 ? (
									<Button
										className="bg-blue-600 hover:bg-blue-500 dark:text-slate-300"
										onClick={() => setShowEducationForm(true)}>
										Add
									</Button>
								) : null}
							</div>
							{user?.education?.length != 0 ? (
								user?.education?.map((item, idx) => (
									<div
										className="w-full h-auto flex items-start justify-between pb-3"
										key={idx}>
										<div className="flex flex-col items-start justify-start gap-2">
											<span className="flex items-center justify-center gap-3">
												<h2 className="font-semibold">
													{item?.qualification} from {item?.institute}
												</h2>
												<p className="text-slate-600 font-medium text-sm">
													( {item?.startMonth + " " + item?.startYear} -{" "}
													{item?.currentlyStudying
														? "Present"
														: item?.endMonth + " " + item?.endYear}
													)
												</p>
											</span>
										</div>
										<div>
											<Pencil
												size={20}
												className="text-blue-600 cursor-pointer"
												onClick={() => {
													setItemIndex(idx);
													setShowEducationForm(true);
												}}
											/>
										</div>
									</div>
								))
							) : (
								<div className="w-full h-auto bg-slate-200/60 dark:bg-slate-800 rounded-md flex items-center justify-between p-2">
									<div className="w-[70%]">
										<p className="text-sm font-medium text-slate-600 dark:text-slate-300">
											Add your educational background here to let employers know
											where you studied or are currently studying
										</p>
									</div>
									<div className="w-[30%] flex items-center justify-center p-2">
										<span
											className="w-[230px] cursor-pointer flex items-center justify-center gap-2 bg-white dark:bg-slate-700 border-[2px] border-blue-600 dark:border-slate-300 rounded-md"
											onClick={() => setShowEducationForm(true)}>
											<Plus className="text-blue-600 dark:text-slate-200" />
											<Button className="bg-inherit text-blue-600 dark:text-slate-300 hover:bg-inherit">
												Add education
											</Button>
										</span>
									</div>
								</div>
							)}
						</div>
					</section>
				</div>
			</PageWrapper>
			{showForm && (
				<Experience
					setShowForm={setShowForm}
					itemIndex={itemIndex}
					setItemIndex={setItemIndex}
				/>
			)}
			{showWorkForm && <WorkPreferenceForm setShowWorkForm={setShowWorkForm} />}
			{showEducationForm && (
				<EducationForm
					setShowEducationForm={setShowEducationForm}
					itemIndex={itemIndex}
					setItemIndex={setItemIndex}
				/>
			)}
		</main>
	);
};

export default Account;
