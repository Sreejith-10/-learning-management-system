import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import {Input} from "../ui/input";
import "@/App.css";
import {Button} from "../ui/button";
import axios from "axios";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useToast} from "../ui/use-toast";

const schema = z.object({
	fname: z
		.string()
		.min(3, {message: "First name must contain at least 3 character(s)"}),
	lname: z.string(),
	age: z
		.string()
		.refine((value) => /^\d+$/.test(value), {
			message: "Age must be a valid positive integer.",
		})
		.refine(
			(value) => {
				const numericValue = parseInt(value, 10);
				return numericValue >= 18;
			},
			{
				message: "Age must be 18 years or older.",
			}
		),
	qualification: z.string(),
	institute: z.string(),
	experience: z.string().refine((value) => /^\d+$/.test(value), {
		message: "Age must be a valid positive integer.",
	}),
	role: z.string(),
});

const NewInstrcutor = () => {
	const naviagte = useNavigate();
	const {toast} = useToast();
	const location = useLocation();

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			fname: location ? location?.state?.fname : "",
			lname: location ? location?.state?.lname : "",
			age: location ? location?.state?.age.toString() : "",
			experience: location ? location?.state?.experience.toString() : "",
			institute: location ? location?.state?.institute : "",
			qualification: location ? location?.state?.qualification : "",
			role: location ? location?.state?.role : "",
		},
	});

	const [profileImage, setProfileImage] = useState<File | undefined>(undefined);

	const updateProfileImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target instanceof HTMLInputElement) {
			if (e.target?.files && e.target?.files.length > 0) {
				setProfileImage(e.target.files[0]);
			}
		}
	};

	const onSubmit = (values: z.infer<typeof schema>) => {
		try {
			let value = {...values, profileImage};
			axios.post("/instructor/create-instructor", value, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			toast({
				title: "Success",
				description: "New instructor added",
			});
			naviagte(-1);
		} catch (error) {
			console.log(error);
		}
	};

	const update = (values: z.infer<typeof schema>) => {
		try {
			const instructorId = location.state?._id;
			let value = {...values, instructorId, profileImage};
			axios.patch("/instructor/update-instructor", value, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			toast({
				title: "Success",
				description: "New instructor added",
			});
			naviagte(-1);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="w-full h-full bg-white shadow-md rounded-lg p-5 space-y-5 dark:bg-slate-900 dark:border dark:border-slate-200 dark:border-opacity-20">
			<div className="w-full flex items-center justify-between">
				<h1 className="font-bold text-2xl">New Instructor</h1>
				<Link
					className="bg-blue-600 hover:bg-blue-400 px-4 py-2 rounded-md text-white font-medium"
					to={"/dashboard/instructors"}>
					Back
				</Link>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(location.state ? update : onSubmit)}
					encType="mulipart/form-data"
					className="space-y-5">
					<FormField
						control={form.control}
						name="fname"
						render={({field}) => (
							<FormItem className="w-auto h-auto relative space-y-0">
								<FormControl>
									<Input
										{...field}
										className="input-area bg-transparent"
										required
									/>
								</FormControl>
								<FormLabel className="absolute pointer-events-none ease-in-out delay-100 duration-200 text-sm font-bold top-1/2 left-3 -translate-y-1/2 label-text">
									First Name
								</FormLabel>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="lname"
						render={({field}) => (
							<FormItem className="w-auto h-auto relative space-y-0">
								<FormControl>
									<Input
										{...field}
										className="input-area bg-transparent"
										required
									/>
								</FormControl>
								<FormLabel className="absolute pointer-events-none ease-in-out delay-100 duration-200 text-sm font-bold top-1/2 left-3 -translate-y-1/2 label-text">
									Last Name
								</FormLabel>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="age"
						render={({field}) => (
							<FormItem className="w-auto h-auto relative space-y-0">
								<FormControl>
									<Input
										{...field}
										className="input-area bg-transparent"
										required
									/>
								</FormControl>
								<FormLabel className="absolute pointer-events-none ease-in-out delay-100 duration-200 text-sm font-bold top-1/2 left-3 -translate-y-1/2 label-text">
									Age
								</FormLabel>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="qualification"
						render={({field}) => (
							<FormItem className="w-auto h-auto relative space-y-0">
								<FormControl>
									<Input
										{...field}
										className="input-area bg-transparent"
										required
									/>
								</FormControl>
								<FormLabel className="absolute pointer-events-none ease-in-out delay-100 duration-200 text-sm font-bold top-1/2 left-3 -translate-y-1/2 label-text">
									Qualification
								</FormLabel>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="institute"
						render={({field}) => (
							<FormItem className="w-auto h-auto relative space-y-0">
								<FormControl>
									<Input
										{...field}
										className="input-area bg-transparent"
										required
									/>
								</FormControl>
								<FormLabel className="absolute pointer-events-none ease-in-out delay-100 duration-200 text-sm font-bold top-1/2 left-3 -translate-y-1/2 label-text">
									Institute
								</FormLabel>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="experience"
						render={({field}) => (
							<FormItem className="w-auto h-auto relative space-y-0">
								<FormControl>
									<Input
										{...field}
										className="input-area bg-transparent"
										required
									/>
								</FormControl>
								<FormLabel className="absolute pointer-events-none ease-in-out delay-100 duration-200 text-sm font-bold top-1/2 left-3 -translate-y-1/2 label-text">
									Years of Experience
								</FormLabel>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="role"
						render={({field}) => (
							<FormItem className="w-auto h-auto relative space-y-0">
								<FormControl>
									<Input
										{...field}
										className="input-area bg-transparent"
										required
									/>
								</FormControl>
								<FormLabel className="absolute pointer-events-none ease-in-out delay-100 duration-200 text-sm font-bold top-1/2 left-3 -translate-y-1/2 label-text">
									Enter your field of expertise
								</FormLabel>
								<FormMessage />
							</FormItem>
						)}
					/>

					<input
						type="file"
						accept="image/"
						onChange={(e) => updateProfileImage(e)}
					/>

					<Button
						type="submit"
						className="bg-blue-600 hover:bg-blue-500 dark:text-slate-100">
						{location?.state ? "Update" : "Submit"}
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default NewInstrcutor;
