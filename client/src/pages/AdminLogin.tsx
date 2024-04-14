import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {EyeIcon, EyeOffIcon} from "lucide-react";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import "../App.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useAppDispatch} from "@/redux";
import {setAuthenticated} from "@/redux/dashboardSlice";

export const loginSchema = z.object({
	email: z.string(),
	password: z.string(),
});

const AdminLogin = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [showPass, setShowPass] = useState(false);
	const [err, setErr] = useState("");
	const [success, _setSuccess] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const submitHandler = async (values: z.infer<typeof loginSchema>) => {
		try {
			setIsSubmitting(true);
			setErr("");
			await axios.post("/auth/admin-login", values, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			dispatch(setAuthenticated(true));
			setIsSubmitting(false);
			navigate("/dashboard");
		} catch (error: any) {
			setIsSubmitting(false);
			setErr(error.response.data.message);
		}
	};

	return (
		<div className="w-full h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
			<div className="w-[500px] h-auto shadow-xl rounded-lg dark:border dark:border-slate-200 dark:border-opacity-20">
				<div className="w-full h-full flex flex-col  items-center justify-center gap-10 p-10">
					<h1 className="font-bold text-lg">Admin Login</h1>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(submitHandler)}
							className="w-full h-auto flex flex-col gap-5">
							<FormField
								control={form.control}
								name="email"
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
											Admin email
										</FormLabel>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({field}) => (
									<FormItem className="w-auto h-auto relative space-y-0">
										{showPass ? (
											<EyeIcon
												className="absolute cursor-pointer z-10 right-3 top-1/2 -translate-y-1/2"
												onClick={() => setShowPass(false)}
											/>
										) : (
											<EyeOffIcon
												className="absolute cursor-pointer z-10 right-3 top-1/2 -translate-y-1/2"
												onClick={() => setShowPass(true)}
											/>
										)}
										<FormControl>
											<Input
												type={showPass ? "text" : "password"}
												{...field}
												className="input-area bg-transparent"
												required
											/>
										</FormControl>
										<FormLabel className="absolute pointer-events-none text-sm font-bold ease-in-out delay-100 duration-200 top-1/2 left-3 -translate-y-1/2 label-text">
											Admin password
										</FormLabel>
									</FormItem>
								)}
							/>
							<FormError message={err} />
							<FormSuccess message={success} />
							<Button
								disabled={isSubmitting}
								type="submit"
								className="w-full bg-blue-700 dark:text-slate-100 hover:bg-blue-500">
								Login
							</Button>
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default AdminLogin;
