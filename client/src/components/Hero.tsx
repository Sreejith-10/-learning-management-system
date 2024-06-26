import {motion} from "framer-motion";
import PageWrapper from "./wrapper/PageWrapper";

const Hero = () => {
	return (
		<section className="w-full h-dvh flex items-center justify-center bg-slate-200/50 dark:bg-slate-900/50">
			<PageWrapper style={{height: "100%"}}>
				<div className="w-1/2 h-full sm:w-full md:w-full flex flex-col items-start justify-center gap-5">
					<motion.h2
						initial={{translateX: -100, opacity: 0}}
						whileInView={{translateX: 0, opacity: 1}}
						transition={{delay: 0.5, type: "spring"}}
						viewport={{once: true}}
						className="text-5xl sm:text-2xl md:text-3xl text-purple-950 dark:text-slate-200">
						Learn Courses <b>Online</b>
					</motion.h2>
					<motion.p
						initial={{translateX: -100, opacity: 0}}
						whileInView={{translateX: 0, opacity: 1}}
						transition={{delay: 0.5, type: "spring"}}
						viewport={{once: true}}
						className="text-xl text-slate-600">
						Technology is building a massive wave of evolution on learining
						things in different ways
					</motion.p>
					<motion.a
						initial={{translateY: 50, opacity: 0}}
						whileInView={{translateY: 0, opacity: 1}}
						transition={{delay: 0.5, type: "spring"}}
						viewport={{once: true}}
						href=""
						className="font-bold uppercase bg-orange-500 text-white px-2 py-2 rounded-md">
						Get started
					</motion.a>
				</div>
				<div className="w-1/2 h-full sm:hidden md:hidden flex items-center justify-center">
					<motion.img
						initial={{translateX: 100, opacity: 0}}
						whileInView={{translateX: 0, opacity: 1}}
						transition={{delay: 0.5, type: "spring"}}
						viewport={{once: true}}
						src="/assets/7915189_3784896.jpg"
						alt=""
					/>
				</div>
				<motion.div
					initial={{opacity: 0, scale: 0}}
					whileInView={{opacity: 1, scale: 1}}
					viewport={{once: true}}
					transition={{delay: 1, type: "spring"}}
					className="absolute flex bottom-[100px] space-x-[100px]">
					<span className="text-start">
						<h1 className="text-4xl font-extrabold text-purple-900 dark:text-slate-300">
							1200+
						</h1>
						<p className="font-semibold">Courses</p>
					</span>
					<span className="text-start">
						<h1 className="text-4xl font-extrabold text-purple-900 dark:text-slate-300">
							134
						</h1>
						<p className="font-semibold">Trained Instructors</p>
					</span>
					<span className="text-start">
						<h1 className="text-4xl font-extrabold text-purple-900 dark:text-slate-300">
							24500+
						</h1>
						<p className="font-semibold">Students</p>
					</span>
				</motion.div>
			</PageWrapper>
		</section>
	);
};

export default Hero;
