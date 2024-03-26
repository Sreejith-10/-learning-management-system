import {motion} from "framer-motion";
import {AlertTriangle} from "lucide-react";
import {Link} from "react-router-dom";

const Cancel = () => {
	return (
		<main className="w-full h-screen flex items-center justify-center">
			<motion.div
				initial={{
					opacity: 0,
					scale: 0,
				}}
				animate={{opacity: 1, scale: 1}}
				transition={{ease: "easeInOut", delay: 0.4}}
				className="w-[400px] h-[550px] bg-white shadow-2xl rounded-lg flex items-center justify-center flex-col gap-5">
				<div className="bg-destructive w-[150px] h-[150px] rounded-full flex items-center justify-center p-3">
					<AlertTriangle className="text-white w-[90%] h-[90%] mb-3" />
				</div>
				<h2 className="font-medium text-lg">Failed to Pay</h2>
				<p className="text-sm font-medium">Payment failed,please try again</p>
				<Link
					to={"/"}
					className="bg-destructive text-white font-medium px-2 py-1 rounded-md">
					Home
				</Link>
			</motion.div>{" "}
		</main>
	);
};

export default Cancel;
