import {Check} from "lucide-react";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import {useAppDispatch, useAppSelector} from "@/redux";
import {useEffect} from "react";
import axios from "axios";
import {updateUser} from "@/redux/authSlice";
import {useCookies} from "react-cookie";

const Succes = () => {
	const [cookie, setCookie] = useCookies();

	const {user} = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();
	const urlp = new URLSearchParams(window.location.search);
	const id = urlp.get("id");

	// useEffect(() => {
	// 	const updateUserCourse = async () => {
	// 		try {
	// 			if (user) {
	// 				const {data} = await axios.get(
	// 					`/course/add-course-key/${id}&${user.userId}`
	// 				);

	// 				if (data) {
	// 					dispatch(updateUser(data.user));
	// 				}
	// 			}
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	};

	// 	updateUserCourse();
	// }, [id]);

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
				<div className="bg-emerald-600/40 w-[150px] h-[150px] rounded-full p-5">
					<Check className="w-full h-full bg-emerald-500 text-white rounded-full p-5" />
				</div>
				<h2 className="font-medium text-lg dark:text-slate-800">
					Successfull Payment
				</h2>
				<p className="text-sm font-medium dark:text-slate-800">
					Thank you for purchasing
				</p>
				<Link
					to={"/"}
					className="bg-emerald-400 text-white font-medium px-2 py-1 rounded-md">
					Home
				</Link>
			</motion.div>
		</main>
	);
};

export default Succes;
