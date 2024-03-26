import {
	CopyrightIcon,
	LucideDribbble,
	LucideFacebook,
	LucideGithub,
	LucideLinkedin,
	LucideTwitter,
	LucideYoutube,
} from "lucide-react";
import {Button} from "./ui/button";

const Footer = () => {
	return (
		<footer className="w-full h-auto bg-slate-200 dark:bg-slate-900/90">
			<div className="mx-[15%] sm:mx-[10%] flex px-5 py-10 flex-col sm:flex-col sm:gap-5">
				<div className="w-full h-auto flex items-center justify-between sm:flex-col md:flex-col md:gap-5 relative after:content-[' '] after:w-full after:h-[2px] after:bg-slate-400 after:dark:bg-slate-500 after:absolute after: left-0 after:top-[100px] md:after:top-[150px]">
					<span>
						<h1 className="font-semibold text-xl">
							Start your learing from Secretly
						</h1>
						<p className="font-medium text-sm">
							Join over 400+ courses from vast categories to find your choice
						</p>
					</span>
					<span className="space-x-5 sm:flex sm:flex-row">
						<Button className="bg-slate-50 border border-slate-400 text-slate-900  hover:bg-slate-100">
							Learn more
						</Button>
						<Button className="bg-blue-600 hover:bg-blue-500 dark:text-slate-300">
							Get started
						</Button>
					</span>
				</div>
				<div className="w-full flex py-[100px]">
					<div className="flex gap-5 md:flex-col md:gap-10">
						<div
							className="w-[40%]
						md:w-full flex flex-col items-start justify-start">
							<span className="flex items-center gap-2">
								<img
									src="/assets/logo/pl.png"
									alt="icons"
									className="size-20"
								/>
								<h1 className="font-semibold text-lg">Secretly</h1>
							</span>
							<p className="font-medium text-sm">
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Laborum, ut error animi ducimus eligendi inventore aut dolorem
								culpa? Beatae earum excepturi at magni consectetur placeat
								dolores totam commodi doloremque rem!
							</p>
						</div>
						<div className="w-[60%] flex justify-evenly sm:flex-wrap sm:gap-5 sm:justify-start md:w-full">
							<span>
								<p className="font-semibold text-slate-700 dark:text-slate-300">
									Company
								</p>
								<ul>
									<li className="font-[600] text-slate-500 cursor-pointer hover:text-slate-600">
										Courses
									</li>
									<li className="font-[600] text-slate-500 cursor-pointer hover:text-slate-600">
										About us
									</li>
									<li className="font-[600] text-slate-500 cursor-pointer hover:text-slate-600">
										News
									</li>
									<li className="font-[600] text-slate-500 cursor-pointer hover:text-slate-600">
										Contact
									</li>
								</ul>
							</span>
							<span>
								<p className="font-semibold text-slate-700 dark:text-slate-300">
									Resources
								</p>
								<ul>
									<li className="font-[600] text-slate-500 cursor-pointer hover:text-slate-600">
										Blog
									</li>
									<li className="font-[600] text-slate-500 cursor-pointer hover:text-slate-600">
										Events
									</li>
									<li className="font-[600] text-slate-500 cursor-pointer hover:text-slate-600">
										Resources
									</li>
									<li className="font-[600] text-slate-500 cursor-pointer hover:text-slate-600">
										Tutorials
									</li>
									<li className="font-[600] text-slate-500 cursor-pointer hover:text-slate-600">
										Support
									</li>
									<li className="font-[600] text-slate-500 cursor-pointer hover:text-slate-600">
										Help centre
									</li>
								</ul>
							</span>
							<span>
								<p className="font-semibold text-slate-700 dark:text-slate-300">
									Social
								</p>
								<ul>
									<li className="font-[600] text-slate-500 cursor-pointer hover:text-slate-600">
										Linkedin
									</li>
									<li className="font-[600] text-slate-500 cursor-pointer hover:text-slate-600">
										Faceebook
									</li>
									<li className="font-[600] text-slate-500 cursor-pointer hover:text-slate-600">
										Twitter
									</li>
									<li className="font-[600] text-slate-500 cursor-pointer hover:text-slate-600">
										YouTube
									</li>
									<li className="font-[600] text-slate-500 cursor-pointer hover:text-slate-600">
										Github
									</li>
									<li className="font-[600] text-slate-500 cursor-pointer hover:text-slate-600">
										Dribble
									</li>
								</ul>
							</span>
							<span>
								<p className="font-semibold text-slate-700 dark:text-slate-300">
									Legal
								</p>
								<ul>
									<li className="font-[600] text-slate-500 cursor-pointer hover:text-slate-600">
										Terms
									</li>
									<li className="font-[600] text-slate-500 cursor-pointer hover:text-slate-600">
										Privacy
									</li>
									<li className="font-[600] text-slate-500 cursor-pointer hover:text-slate-600">
										Licenses
									</li>
									<li className="font-[600] text-slate-500 cursor-pointer hover:text-slate-600">
										Settings
									</li>
								</ul>
							</span>
						</div>
					</div>
				</div>
				<div className="w-full flex md:flex-col md:gap-5 items-center justify-between relative after:content-[' '] after:w-full after:h-[2px] after:bg-slate-400 after:dark:bg-slate-500 after:absolute after: left-0 after:top-[-50px]">
					<span className="flex items-center gap-2 font-medium">
						<CopyrightIcon /> 2024 Secretly, All rights reserved
					</span>
					<span className="flex items-center justify-center gap-5">
						<LucideTwitter />
						<LucideFacebook />
						<LucideLinkedin />
						<LucideYoutube />
						<LucideDribbble />
						<LucideGithub />
					</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
