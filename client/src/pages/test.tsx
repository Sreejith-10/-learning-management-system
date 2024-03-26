import {Input} from "@/components/ui/input";
import {useState} from "react";
const Test = () => {
	const [date, setDate] = useState("");

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<form onSubmit={submitHandler}>
			<Input
				type="date"
				className="w-[400px]"
				onChange={(e) => setDate(e.target.value)}
			/>
			<button type="submit">Submit</button>
		</form>
	);
};

export default Test;
