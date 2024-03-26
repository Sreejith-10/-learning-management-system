import Account from "@/pages/Account";
import AllCourse from "@/pages/AllCourse";
import Cancel from "@/pages/Cancel";
import CourseData from "@/pages/CourseData";
import CourseDetails from "@/pages/CourseDetails";
import Home from "@/pages/Home";
import Succes from "@/pages/Succes";
import UserCourses from "@/pages/UserCourses";
import {Route, Routes} from "react-router-dom";
import AuthRoute from "./AuthRoute";
import ReviewForm from "@/components/forms/ReviewForm";

const ClientRoute = () => {
	return (
		<Routes>
			<Route index element={<Home />} />
			<Route path="course" element={<CourseDetails />} />
			<Route path="search" element={<AllCourse />} />
			<Route element={<AuthRoute />}>
				<Route path="my-courses" element={<UserCourses />} />
				<Route path="my-account" element={<Account />} />
				<Route path="course-data/*" element={<CourseData />} />
				<Route path="/review" element={<ReviewForm />} />
			</Route>
			<Route path="cancel" element={<Cancel />} />
			<Route path="success" element={<Succes />} />
		</Routes>
	);
};

export default ClientRoute;
