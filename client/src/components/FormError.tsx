import {AlertTriangle} from "lucide-react";
import {Label} from "./ui/label";

const FormError = ({message}: {message: string}) => {
	if (!message) return;
	return (
		<Label className="bg-destructive/20 text-destructive w-full h-auto flex items-center justify-center gap-3 py-5 rounded-md border border-destructive">
			<AlertTriangle />
			{message}
		</Label>
	);
};

export default FormError;
