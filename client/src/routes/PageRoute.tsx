import AdminLogin from "@/pages/AdminLogin";
import Content from "@/pages/Content";
import Dashboard from "@/pages/DashBoard";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import {Route, Routes} from "react-router-dom";
import Test from "@/pages/test";
import ProtectedRoute from "./ProtectedRoute";
import PasswordReset from "@/pages/PasswordReset";
import EmailConfirmation from "@/pages/EmailConfirmation";

const PageRoute = () => {
	return (
		<Routes>
			<Route path="/*" element={<Content />} />
			<Route path="/register" element={<Register />} />
			<Route path="/login" element={<Login />} />
			<Route
				path="/dashboard/*"
				element={
					<ProtectedRoute>
						<Dashboard />
					</ProtectedRoute>
				}
			/>
			<Route path="/admin-login" element={<AdminLogin />} />
			<Route path="/email-confirmation" element={<EmailConfirmation />} />
			<Route path="/reset-password/:id/:token" element={<PasswordReset />} />
			<Route path="/test" element={<Test />} />
		</Routes>
	);
};

export default PageRoute;
