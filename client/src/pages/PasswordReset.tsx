import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from "zod";
import "@/App.css";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {Label} from "@/components/ui/label";
import {AlertTriangle, EyeIcon, EyeOffIcon} from "lucide-react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useToast} from "@/components/ui/use-toast";

const passwordSchema = z.object({
	password: z.string().min(6, {message: "Password should be 6 character long"}),
	confirmPassword: z.string(),
});
const PasswordReset = () => {
	const [err, setErr] = useState(false);
	const [errMessage, setErrMessage] = useState("");
	const [showPass, setShowPass] = useState(false);
	const [showConfirmPass, setShowConfirmPass] = useState(false);

	const navigate = useNavigate();

	const {toast} = useToast();
	const {id, token} = useParams();

	const form = useForm<z.infer<typeof passwordSchema>>({
		resolver: zodResolver(passwordSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});

	const submitHandler = async (values: z.infer<typeof passwordSchema>) => {
		if (values.password !== values.confirmPassword) {
			setErr(true);
			setErrMessage("Password do not match");
			return;
		} else {
			const {data} = await axios.post(
				`/auth/reset-password/${id}/${token}`,
				values
			);
			toast({title: "Success", description: data.message});
			navigate("/login");
			setErr(false);
			setErrMessage("");
			return;
		}
	};

	return (
		<main className="w-full h-[100dvh] grid place-content-center bg-blue-200/50 dark:bg-slate-900">
			<section className="w-[600px] h-auto shadow-lg rounded-md bg-slate-50 dark:bg-slate-800 px-10 py-20 space-y-5">
				<header className="flex items-center justify-center">
					<img className="size-20" src="/assets/logo/pl.png" alt="icons" />
					<h2 className="font-bold uppercase text-2xl">Secretly</h2>
				</header>
				<div className="w-full space-y-10">
					<h1 className="text-center font-semibold text-lg">
						Reset your password
					</h1>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(submitHandler)}
							className="w-full h-auto flex flex-col gap-5">
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
												className="input-area bg-transparent dark:border-slate-100"
												required
											/>
										</FormControl>
										<FormLabel className="absolute pointer-events-none ease-in-out delay-100 duration-200 text-sm font-bold top-1/2 left-3 -translate-y-1/2 label-text">
											New Passworrd
										</FormLabel>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="confirmPassword"
								render={({field}) => (
									<FormItem className="w-auto h-auto relative space-y-0">
										{showConfirmPass ? (
											<EyeIcon
												className="absolute cursor-pointer z-10 right-3 top-1/2 -translate-y-1/2"
												onClick={() => setShowConfirmPass(false)}
											/>
										) : (
											<EyeOffIcon
												className="absolute cursor-pointer z-10 right-3 top-1/2 -translate-y-1/2"
												onClick={() => setShowConfirmPass(true)}
											/>
										)}
										<FormControl>
											<Input
												type={showConfirmPass ? "text" : "password"}
												{...field}
												className="input-area bg-transparent dark:border-slate-100"
												required
											/>
										</FormControl>
										<FormLabel className="absolute pointer-events-none ease-in-out delay-100 duration-200 text-sm font-bold top-1/2 left-3 -translate-y-1/2 label-text">
											Confirm Password
										</FormLabel>
										<FormMessage />
									</FormItem>
								)}
							/>
							{err ? (
								<Label className="bg-destructive/20 text-destructive w-full h-auto flex items-center justify-center gap-3 py-5 rounded-md border border-destructive">
									<AlertTriangle />
									{errMessage}
								</Label>
							) : null}
							<div>
								<Button
									type="submit"
									className="w-full bg-blue-500 hover:bg-blue-400 dark:text-slate-100">
									Reset Password
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</section>
		</main>
	);
};

export default PasswordReset;
