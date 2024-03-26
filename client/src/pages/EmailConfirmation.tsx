import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {useState} from "react";
import axios from "axios";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";
import {useNavigate} from "react-router-dom";

const EmailConfirmation = () => {
	const [email, setEmail] = useState("");
	const [err, setErr] = useState("");
	const [success, setSuccess] = useState("");

	const navigate = useNavigate();

	const sentVerificationCode = async () => {
		axios
			.post(
				"/auth/send-reset-email",
				{email},
				{headers: {"Content-Type": "application/json"}}
			)
			.then((res) => {
				setSuccess(res.data.message);
				navigate("/login");
			})
			.catch((err) => setErr(err.response.data.message));
	};

	return (
		<main className="w-full h-screen grid place-content-center bg-blue-200/50 dark:bg-slate-800">
			<section className="w-[600px] h-auto shadow-lg text-center rounded-md bg-slate-50 dark:bg-slate-900 px-10 py-20 space-y-5">
				<header>
					<h2 className="font-semibold">
						Enter your email for resetting the passowrd
					</h2>
				</header>
				<div className="w-auto h-auto relative space-y-0">
					<Input
						type="text"
						name="coursePrice"
						required
						onChange={(e) => setEmail(e.target.value)}
						className="input-area bg-transparent"
					/>
					<Label className="absolute pointer-events-none ease-in-out delay-100 duration-200 text-sm font-bold top-1/2 left-3 -translate-y-1/2 label-text">
						Type your email
					</Label>
				</div>
				<Button
					onClick={sentVerificationCode}
					className="bg-blue-500 hover:bg-blue-600 dark:text-slate-100">
					Send
				</Button>
				<FormSuccess message={success} />
				<FormError message={err} />
			</section>
		</main>
	);
};

export default EmailConfirmation;
