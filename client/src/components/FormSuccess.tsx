import {CheckCircle2} from "lucide-react";
import {Label} from "./ui/label";

const FormSuccess = ({message}: {message: string}) => {
	if (!message) return;
	return (
		<Label className="bg-emerald-500/20 text-emerald-600 w-full h-auto flex items-center justify-center gap-3 py-5 rounded-md border border-emerald-500">
			<CheckCircle2 />
			{message}
		</Label>
	);
};

export default FormSuccess;
