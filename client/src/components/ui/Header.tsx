import {
	ChevronLeft,
	ChevronRight,
	Menu,
	Moon,
	Search,
	Sun,
	X,
} from "lucide-react";
import {Input} from "./input";
import {useAppDispatch, useAppSelector} from "@/redux";
import {Avatar, AvatarFallback, AvatarImage} from "./avatar";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarTrigger,
} from "./menubar";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {updateSearchKey} from "@/redux/courseSlice";
import axios from "axios";
import {easeInOut, motion} from "framer-motion";
import {useToast} from "./use-toast";
import {setAuth, updateUser} from "@/redux/authSlice";
import {useTheme} from "../theme-provider";
import {useScrollDirection} from "@/hooks/useScrollDirection";
import SearchBox from "./searchbox";

const Header = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const {isLogged} = useAppSelector((state) => state.auth);
	const {user} = useAppSelector((state) => state.auth);
	const [searchKey, _setSearchKey] = useState("");
	const [showNav, setShowNav] = useState<boolean>(false);
	const [showAccount, setShowAccount] = useState<boolean>(false);
	const [showSearchBar, setShowSearchBar] = useState(false);

	const {theme, setTheme} = useTheme();
	const {toast} = useToast();

	useEffect(() => {
		if (showNav) {
			document.body.style.overflowX = "hidden";
		}
	}, []);

	const logOut = async () => {
		const {data} = await axios.get("/auth/logout");
		dispatch(setAuth(false));
		dispatch(
			updateUser({
				userId: "",
				userEmail: "",
				userName: "",
				profileImage: "",
				workPreference: {
					role: "",
					industry: "",
					workRemote: false,
					relocate: false,
				},
				workExperience: [
					{
						role: "",
						company: "",
						startYear: "",
						startMonth: "",
						endYear: "",
						endMonth: "",
						currentlyWorking: false,
						description: "",
						_id: "",
					},
				],
				education: [
					{
						institute: "",
						qualification: "",
						startYear: "",
						startMonth: "",
						endYear: "",
						endMonth: "",
						currentlyStudying: false,
						_id: "",
					},
				],
				courses: [
					{
						courseId: "",
						buyingDate: "",
						status: "Started",
						progress: 0,
						sessionsCompleted: [""],
					},
				],
			})
		);
		toast({description: data.message});
	};

	const navigatonHandler = (to: string) => {
		setShowNav(false);
		setShowAccount(false);
		navigate(to);
	};

	const scrollDirection = useScrollDirection();

	return (
		<motion.header
			variants={{
				start: {
					y: -100,
					opacity: 0,
					transition: easeInOut,
				},
				end: {
					y: 0,
					opacity: 1,
					transition: easeInOut,
				},
			}}
			initial="end"
			animate={scrollDirection === "down" ? "start" : "end"}
			className="w-full h-20 bg-slate-100 dark:bg-slate-900 fixed top-0 left-0 shadow-xl z-50 sm:relative md:relative">
			<nav
				className={`w-full h-full flex items-center justify-evenly gap-20 sm:justify-center`}>
				<div className="hidden sm:block md:block lg:block pl-2">
					<Menu
						onClick={() => setShowNav(true)}
						size={30}
						className={`${showNav ? "invisible" : "block"}`}
					/>
				</div>
				<div className="flex items-center md:justify-center gap-5 sm:w-full">
					<img
						src="/assets/logo/pl.png"
						alt=""
						className="w-20 h-20 sm:hidden md:hidden lg:hidden"
					/>
					{showSearchBar ? (
						<div className="md:w-full md:h-auto">
							<SearchBox />
						</div>
					) : (
						<h2 className="text-3xl sm:text-2xl sm:font-bold text-slate-700 dark:text-slate-300 text-center">
							<b>SECRETLY</b>
						</h2>
					)}
				</div>
				<div className="hidden sm:block md:block lg:block pr-2">
					{showNav ? (
						<X
							onClick={() => {
								setShowAccount(false);
								setShowNav(false);
							}}
							size={30}
						/>
					) : (
						<Search
							className="text-black dark:text-slate-600"
							size={30}
							onClick={() => setShowSearchBar(!showSearchBar)}
						/>
					)}
				</div>
				<div className="w-[20%] h-10 relative space-y-5 sm:hidden md:hidden lg:hidden">
					<SearchBox />
				</div>
				<div className="flex flex-row gap-5 sm:hidden md:hidden lg:hidden">
					<div className="flex items-center">
						{theme === "light" ? (
							<Moon
								onClick={() => setTheme("dark")}
								className="cursor-pointer"
							/>
						) : (
							<Sun
								onClick={() => setTheme("light")}
								className="cursor-pointer"
							/>
						)}
					</div>
					{isLogged ? (
						<Menubar className="bg-inherit border-none py-7 cursor-pointer">
							<MenubarMenu>
								<MenubarTrigger className="bg-none flex items-center justify-center gap-2">
									<Avatar>
										<AvatarFallback className="bg-blue-500 font-bold text-[1rem] text-slate-100">
											{user?.userName?.charAt(0)}
										</AvatarFallback>
										<AvatarImage src={user?.profileImage} alt="icon" />
									</Avatar>
								</MenubarTrigger>
								<MenubarContent className="cursor-pointer">
									<MenubarItem>
										<Link to={"/my-account"}>Account</Link>
									</MenubarItem>
									<MenubarItem>
										<Link to={"/my-courses"}>Your Courses</Link>
									</MenubarItem>
									<MenubarItem>Payment</MenubarItem>
									<MenubarItem>Settings</MenubarItem>
									<MenubarItem onClick={logOut}>Logut</MenubarItem>
								</MenubarContent>
							</MenubarMenu>
						</Menubar>
					) : (
						<>
							<a
								href="/register"
								className="bg-blue-500 text-white px-3 py-2 rounded-[5px] shadow-md">
								SignUp?
							</a>
							<a
								href="/login"
								className="bg-white text-blue-500 px-3 py-2 rounded-[5px] shadow-md">
								Login?
							</a>
						</>
					)}
				</div>
			</nav>
			<motion.div
				variants={{
					show: {
						translateX: 0,
					},
					hide: {
						translateX: -1000,
					},
				}}
				initial="hide"
				animate={showNav ? "show" : "hide"}
				transition={{ease: "easeInOut", type: "spring"}}
				className="w-full h-[calc(100vh-80px)] hidden sm:block md:block lg:block absolute bg-slate-100 dark:bg-slate-900 p-4 space-y-4 sm:fixed">
				<div className="w-full h-auto flex items-center gap-5">
					<Avatar>
						<AvatarImage src="/assets/random/testimonial-4.jpg" />
						<AvatarFallback>{user?.userName?.charAt(0)}</AvatarFallback>
					</Avatar>
					<h2 className="font-medium">{user?.userName}</h2>
				</div>
				<div className="w-full space-y-3">
					<span
						onClick={() => setShowAccount(true)}
						className="w-full flex items-center justify-between">
						<h1 className="font-medium">Your Account</h1>
						<ChevronRight />
					</span>
					<h1 className="font-medium">Help Center</h1>
					<h1 className="font-medium">Get our App</h1>
				</div>
				<div className="w-screen fixed bottom-5 left-5 flex items-center">
					{theme === "light" ? (
						<Moon onClick={() => setTheme("dark")} className="cursor-pointer" />
					) : (
						<Sun onClick={() => setTheme("light")} className="cursor-pointer" />
					)}
				</div>
			</motion.div>
			<motion.div
				variants={{
					show: {
						translateX: 0,
					},
					hide: {
						translateX: 1050,
					},
				}}
				initial="show"
				animate={showAccount ? "show" : "hide"}
				className="w-full h-[calc(100vh-80px)] hidden sm:block md:block lg:block fixed bg-slate-100 dark:bg-slate-900 space-y-4">
				<span
					onClick={() => setShowAccount(false)}
					className="w-full py-4 flex items-center justify-start gap-5 bg-slate-300 dark:bg-slate-700">
					<ChevronLeft />
					<h1 className="font-medium">Main Menu</h1>
				</span>
				<h1 className="font-semibold pl-4">Your Account</h1>
				<div className="space-y-3 px-5 flex flex-col">
					<h1
						onClick={() => navigatonHandler("/my-account")}
						className="font-medium">
						Profile
					</h1>
					<h1
						onClick={() => {
							navigatonHandler("/my-courses");
						}}
						className="font-medium">
						My Courses
					</h1>
					<h1 className="font-medium">My purchases</h1>
					<h1 className="font-medium">Settings</h1>
					{isLogged ? (
						<h1 className="font-medium" onClick={logOut}>
							Log Out
						</h1>
					) : (
						<h1 className="font-medium" onClick={() => navigate("/login")}>
							Log In
						</h1>
					)}
				</div>
			</motion.div>
		</motion.header>
	);
};

export default Header;
