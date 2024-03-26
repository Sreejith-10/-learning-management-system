import Hero from "../components/Hero";
import FeaturesSection from "../components/wrapper/FeaturesSection";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import {motion} from "framer-motion";
import PageWrapper from "@/components/wrapper/PageWrapper";
import RecomendedSection from "@/components/wrapper/RecomendedSection";
import {company, features, jobs} from "@/constants/data";
import {Link} from "react-router-dom";

const Home = () => {
	return (
		<>
			<main className="w-full h-full bg-slate-100/10">
				<Hero />
				<FeaturesSection />
				<RecomendedSection />
				<section className="w-full h-auto sm:h-auto md:h-auto lg:h-full flex items-center flex-col justify-center gap-10 sm:pt-10">
					<PageWrapper style={{width: "auto", flexDirection: "column"}}>
						<div className="w-full h-full flex flex-col items-center justify-center gap-2 mt-[100px] sm:mt-0 mb-10 px-3">
							<h1 className="font-bold text-purple-950 text-4xl sm:text-2xl sm:text-center dark:text-slate-200">
								Why study with {company}
							</h1>
							<p className="text-slate-500 text-lg dark:text-slate-500">
								Discover perfect in our courses
							</p>
						</div>
						<div className="w-full h-[400px] sm:h-full lg:w-full lg:h-auto xl:w-full flex justify-between sm:items-center sm:flex-col sm:justify-center lg:flex-col lg:gap-10 lg:items-center lg:justify-between lg:space-y-10 gap-10">
							{features.map((item, id) => (
								<motion.div
									initial={{translateY: 100, opacity: 0}}
									whileInView={{translateY: 0, opacity: 1}}
									transition={{delay: id * 0.4, ease: "easeIn"}}
									viewport={{once: true}}
									key={id}
									className="w-[300px] xl:w-auto lg:w-[100px] lg:h-[300px] h-full flex items-center justify-evenly sm:gap-10 flex-col">
									<div
										style={{background: `${item.color}`}}
										className={`w-[100px] h-[100px] lg:h-[100px] rounded-full flex items-center justify-center relative before:content-[''] before:absolute before:flex before:justify-center before:items-center before:w-[150px] before:h-[150px] before:shadow-xl before:rounded-full font-bold text-4xl text-white`}>
										<img
											src={item.image}
											alt="not found"
											className="w-[50px] dark:invert"
										/>
									</div>
									<div className="flex flex-col items-center justify-center">
										<h2 className="font-semibold text-center text-xl">
											{item.title}
										</h2>
										<p className="text-center text-slate-500 ">
											{item.description}
										</p>
									</div>
								</motion.div>
							))}
						</div>
					</PageWrapper>
				</section>
				<section className="w-full h-auto mb-[200px] flex flex-col gap-10 sm:mb-20 sm:mt-20">
					<PageWrapper style={{flexDirection: "column"}}>
						<div className="w-full flex flex-col items-center justify-center gap-2 mb-10 mt-[100px] sm:mt-0">
							<h1 className="font-bold text-purple-950 dark:text-slate-200 text-4xl sm:text-2xl md:text-2xl">
								Trending Categories
							</h1>
							<p className="text-slate-500 text-lg sm:text-center  dark:text-slate-500">
								Discover a vast range of courses
							</p>
						</div>
						<div className="w-full flex items-center justify-center sm:flex-col lg:flex-wrap lg:gap-1 gap-5">
							<div className="w-[300px] h-[300px] rounded-md bg-orange-400 flex items-center justify-center gap-10 flex-col">
								<div>
									<img
										src="/assets/icons/software-development.png"
										alt="icons"
										className="w-[100px]"
									/>
								</div>
								<div className="w-full flex items-center flex-col justify-center">
									<h1 className="font-bold text-slate-900 text-lg">
										Software Development
									</h1>
									<p className="font-semibold text-slate-800">
										Over 1200 Courses
									</p>
								</div>
							</div>

							<div className="w-[300px] h-[300px] rounded-md bg-lime-400 flex items-center justify-center gap-10 flex-col">
								<div>
									<img
										src="/assets/icons/artificial-intelligence.png"
										alt="icons"
										className="w-[100px]"
									/>
								</div>
								<div className="w-full flex items-center flex-col justify-center">
									<h1 className="font-bold text-slate-900 text-lg">
										Artificial Intelligence
									</h1>
									<p className="font-semibold text-slate-800">
										Over 200 Courses
									</p>
								</div>
							</div>
							<div className="w-[300px] h-[300px] rounded-md bg-pink-400 flex items-center justify-center gap-10 flex-col">
								<div>
									<img
										src="/assets/icons/digital-marketing.png"
										alt="icons"
										className="w-[100px]"
									/>
								</div>
								<div className="w-full flex items-center flex-col justify-center">
									<h1 className="font-bold text-slate-900 text-lg">
										Digital Marketing
									</h1>
									<p className="font-semibold text-slate-800">
										Over 120 Courses
									</p>
								</div>
							</div>
							<div className="w-[300px] h-[300px] rounded-md bg-purple-400  flex items-center justify-center gap-10 flex-col">
								<div>
									<img
										src="/assets/icons/data.png"
										alt="icons"
										className="w-[100px]"
									/>
								</div>
								<div className="w-full flex items-center flex-col justify-center">
									<h1 className="font-bold text-slate-900 text-lg">
										Data Analytics
									</h1>
									<p className="font-semibold text-slate-800">
										Over 10 Courses
									</p>
								</div>
							</div>
						</div>
					</PageWrapper>
				</section>
				<section className="w-full h-auto mb-[200px] flex flex-col gap-10 sm:mb-20">
					<PageWrapper style={{flexDirection: "column"}}>
						<div className="w-full flex flex-col items-center justify-center gap-2 mb-10">
							<h1 className="font-bold text-purple-950 dark:text-slate-200 text-4xl sm:text-2xl md:text-2xl sm:text-center">
								What our students have to stay
							</h1>
							<p className="text-slate-500 text-lg sm:text-center dark:text-slate-350">
								These are the students who completed there lession from this
								company and now in a great path
							</p>
						</div>
						<Carousel
							opts={{
								align: "start",
								loop: true,
							}}>
							<CarouselContent>
								<CarouselItem className="flex items-center justify-center">
									<div className="w-[500px] sm:w-[300px] h-[300px] sm:h-fit flex items-center flex-col justify-center gap-3">
										<img
											className="w-20 h-20 sm:h-10 sm:w-10 rounded-full"
											src="/assets/random/testimonial-5.jpg"
											alt="testmonials"
										/>
										<h2 className="font-bold text-xl">Saraya Thomas</h2>
										<h4 className="text-slate-500">WordPress Developer</h4>
										<p className="text-slate-800 text-center dark:text-slate-300">
											" Lorem, ipsum dolor sit amet consectetur adipisicing
											elit. Dolorum repudiandae ducimus adipisci, voluptate
											debitis ullam, hic sint quo voluptatem, quidem unde
											tempore! Eveniet soluta asperiores et animi at aliquid
											culpa?"
										</p>
									</div>
								</CarouselItem>
								<CarouselItem className="flex items-center justify-center">
									<div className="w-[500px] h-[300px] flex items-center flex-col justify-center gap-3">
										<img
											className="w-20 h-20 sm:h-10 sm:w-10 rounded-full"
											src="/assets/random/testimonial-3.jpg"
											alt="testmonials"
										/>
										<h2 className="font-bold text-xl">lorem Thomas</h2>
										<h4 className="text-slate-500">Front Developer</h4>
										<p className="text-slate-800 text-center dark:text-slate-300">
											" Lorem, ipsum dolor sit amet consectetur adipisicing
											elit. Dolorum repudiandae ducimus adipisci, voluptate
											debitis ullam, hic sint quo voluptatem, quidem unde
											tempore! Eveniet soluta asperiores et animi at aliquid
											culpa?"
										</p>
									</div>
								</CarouselItem>
								<CarouselItem className="flex items-center justify-center">
									<div className="w-[500px] h-[300px] flex items-center flex-col justify-center gap-3">
										<img
											className="w-20 h-20 sm:h-10 sm:w-10 rounded-full"
											src="/assets/random/testimonial-1.jpg"
											alt="testmonials"
										/>
										<h2 className="font-bold text-xl">Lorem, ipsum.</h2>
										<h4 className="text-slate-500">Lorem, ipsum dolor.</h4>
										<p className="text-slate-800 text-center dark:text-slate-300">
											" Lorem, ipsum dolor sit amet consectetur adipisicing
											elit. Dolorum repudiandae ducimus adipisci, voluptate
											debitis ullam, hic sint quo voluptatem, quidem unde
											tempore! Eveniet soluta asperiores et animi at aliquid
											culpa?"
										</p>
									</div>
								</CarouselItem>
							</CarouselContent>
							<CarouselPrevious />
							<CarouselNext />
						</Carousel>
					</PageWrapper>
				</section>
				<section className="w-full">
					<PageWrapper style={{flexDirection: "column"}}>
						<div className="w-full flex flex-col items-center justify-center gap-2 mb-10">
							<h1 className="font-bold text-purple-950 dark:text-slate-200 text-4xl sm:text-2xl">
								Job Posting/Careers
							</h1>
							<p className="text-slate-500 text-lg sm:text-center dark:text-slate-350">
								Find prefect job that matches your skills
							</p>
						</div>
						<div className="w-full h-auto flex flex-wrap items-center justify-center gap-5 py-10">
							{jobs.map((item, idx) => (
								<motion.div
									initial={{opacity: 0, scale: 0}}
									whileInView={{opacity: 1, scale: 1}}
									viewport={{once: true}}
									transition={{
										ease: "easeInOut",
										delay: idx * 0.4,
										type: "spring",
									}}
									key={idx}
									className="w-fit sm:w-full md:w-full bg-white dark:bg-slate-800 dark:border-opacity-25 shadow-lg flex items-start justify-center flex-col rounded-md border border-slate-300 p-5">
									<h2 className="font-semibold">{item.position}</h2>
									<span className="w-full flex items-center gap-5">
										<h2 className="text-[12px] font-medium">{item.company}</h2>
										<h4 className="text-[12px] font-medium">{item.contact}</h4>
									</span>
									<Link
										to={"/job-posting"}
										className="text-[14px] pt-3 text-blue-600">
										View
									</Link>
								</motion.div>
							))}
						</div>
					</PageWrapper>
				</section>
			</main>
		</>
	);
};

export default Home;
