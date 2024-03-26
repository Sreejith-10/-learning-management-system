import CourseList from "@/components/dashboard/CourseList";
import Instructors from "@/components/dashboard/Instructors";
import MainDash from "@/components/dashboard/MainDash";
import NewCourseForm from "@/components/dashboard/NewCourseForm";
import NewInstrcutor from "@/components/dashboard/NewInstrcutor";
import SingleCourse from "@/components/dashboard/SingleCourse";
import SingleInstructor from "@/components/dashboard/SingleInstructor";
import {Route, Routes} from "react-router-dom";

const DashBoardRoute = () => {
	return (
		<Routes>
			<Route path="/" element={<MainDash />} />
			<Route path="/courses/*">
				<Route path="*" element={<CourseList />} />
				<Route path="new-course" element={<NewCourseForm />} />
				<Route path="edit-course" element={<NewCourseForm />} />
				<Route path="single-course" element={<SingleCourse />} />
			</Route>
			<Route path="/instructors/*">
				<Route index element={<Instructors />} />
				<Route path="new-instructor" element={<NewInstrcutor />} />
				<Route path="single-instructor/:id" element={<SingleInstructor />} />
				<Route path="edit-instructor" element={<NewInstrcutor />} />
			</Route>
		</Routes>
	);
};

export default DashBoardRoute;
