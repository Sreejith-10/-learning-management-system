import {useAppDispatch} from "@/redux";
import {setAuthenticated} from "@/redux/dashboardSlice";
import axios from "axios";
import {
	AlignEndHorizontal,
	LandPlot,
	LayoutDashboard,
	LogOut,
	PersonStanding,
	Settings,
} from "lucide-react";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

const SideNav = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [active, setActive] = useState("/dashboard");

	const logout = () => {
		try {
			axios.get("/auth/logout");
			dispatch(setAuthenticated(false));
			navigate("/admin-login");
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		setActive(window?.location?.pathname);
	}, [window.location.pathname]);

	return (
		<aside className="w-full h-full flex flex-col items-center justify-between">
			<div className="w-full h-auto flex items-center justify-center">
				<img src="/assets/logo/pl.png" alt="not found" className="w-20 h-20" />
				<h1 className="text-white font-bold text-lg uppercase">Secretly</h1>
			</div>
			<div className="w-full h-auto mb-[250px]">
				<ul className="w-full h-auto flex items-center flex-col gap-10">
					<li className="w-full">
						<Link to={"/dashboard"} className="w-full flex gap-5 items-center">
							<div className="w-[30%]">
								<LayoutDashboard
									size={40}
									className={`float-end ${
										active === "/dashboard" ? "text-slate-50" : "text-slate-700"
									}`}
								/>
							</div>
							<h4
								className={`w-[70%] ${
									active === "/dashboard" ? "text-slate-50" : "text-slate-700"
								} text-start text-lg`}>
								Dashboard
							</h4>
						</Link>
					</li>
					<li className="w-full">
						<Link
							to={"/dashboard/courses"}
							className="w-full flex gap-5 items-center">
							<div className="w-[30%]">
								<LandPlot
									size={40}
									className={`float-end ${
										active === "/dashboard/courses"
											? "text-slate-50"
											: "text-slate-700"
									}`}
								/>
							</div>
							<h4
								className={`w-[70%] ${
									active === "/dashboard/courses"
										? "text-slate-50"
										: "text-slate-700"
								} text-start text-lg`}>
								Courses
							</h4>
						</Link>
					</li>
					<li className="w-full">
						<Link
							to={"/dashboard/instructors"}
							className="w-full flex gap-5 items-center">
							<div className="w-[30%]">
								<PersonStanding
									size={40}
									className={`float-end ${
										active === "/dashboard/instructors"
											? "text-slate-50"
											: "text-slate-700"
									}`}
								/>
							</div>
							<h4
								className={`w-[70%] ${
									active === "/dashboard/instructors"
										? "text-slate-50"
										: "text-slate-700"
								} text-start text-lg`}>
								Instructors
							</h4>
						</Link>
					</li>
					<li className="w-full flex gap-5 items-center">
						<div className="w-[30%]">
							<AlignEndHorizontal
								size={40}
								className="float-end text-slate-700"
							/>
						</div>
						<h4 className="w-[70%] text-slate-700 text-start text-lg">
							Analysis
						</h4>
					</li>
					<li className="w-full flex gap-5 items-center">
						<div className="w-[30%]">
							<Settings size={40} className="float-end text-slate-700" />
						</div>
						<h4 className="w-[70%] text-slate-700 text-start text-lg">
							Settings
						</h4>
					</li>
				</ul>
			</div>
			<div className="w-full flex items-center justify-center gap-10">
				<LogOut
					size={40}
					className="text-slate-700 cursor-pointer"
					onClick={logout}
				/>
				<h1 className="text-white text-lg mr-[100px]">Log out</h1>
			</div>
		</aside>
	);
};

export default SideNav;
