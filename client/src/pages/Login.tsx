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
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useAppDispatch} from "@/redux";
import {setAuth, updateUser} from "@/redux/authSlice";
import {useToast} from "@/components/ui/use-toast";
import {useGoogleLogin} from "@react-oauth/google";

export const loginSchema = z.object({
	email: z.string(),
	password: z.string(),
});

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const {toast} = useToast();

	const [showPass, setShowPass] = useState(false);
	const [err, setErr] = useState("");
	const [success, setSuccess] = useState("");
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
			const {data} = await axios.post("/auth/login", values, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			dispatch(setAuth(data.token));
			dispatch(updateUser(data.user));
			setIsSubmitting(false);
			setSuccess(data.message);
			toast({
				title: "Logged in",
				description: "Welcome Back to Secretly",
			});
			navigate("/");
		} catch (error: any) {
			setIsSubmitting(false);
			setErr(error.response.data.message);
		}
	};

	const responseGoogle = async (response: any) => {
		try {
			const accessToken = response.access_token;
			const {data} = await axios.post("/auth/googlelogin", {accessToken});
			dispatch(setAuth(data.token));
			dispatch(updateUser(data.user));
			setSuccess(data.message);
			localStorage.setItem("token", JSON.stringify(data.token));
			toast({
				title: "Logged in",
				description: `Welcome back ${data.user.userName}`,
			});
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	const login = useGoogleLogin({onSuccess: responseGoogle});

	return (
		<div className="w-full h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
			<div className="w-[500px] h-auto shadow-xl rounded-lg dark:border dark:border-slate-200 dark:border-opacity-20">
				<div className="w-full h-full flex flex-col  items-center justify-center gap-10 p-10">
					<h1 className=" font-bold text-lg">Login</h1>
					<div
						onClick={() => login()}
						className="w-full h-fit border border-slate-500 border-opacity-30 rounded-md flex items-center justify-center gap-5 py-2 cursor-pointer">
						<img src="/assets/google.png" alt="google" className="w-8 h-8" />
						<p className="text-sm">Signin with google</p>
					</div>
					<div>
						<h2 className="font-medium">Or login with email</h2>
					</div>
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
											Email
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
											Password
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
						<span className="w-full flex items-center justify-between">
							<Link
								className="hover:text-purple-700 ease-linear delay-200"
								to={"/register"}>
								Create a new account{" "}
							</Link>
							<Link
								className="hover:text-purple-700 ease-linear delay-200"
								to={"/email-confirmation"}>
								Forgot password ?
							</Link>
						</span>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default Login;
