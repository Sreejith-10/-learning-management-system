import {useAppSelector} from "@/redux";
import {Navigate, Outlet} from "react-router";

const AuthRoute = () => {
	const {isLogged} = useAppSelector((state) => state.auth);

	return isLogged ? <Outlet /> : <Navigate to={"/login"} />;
};

export default AuthRoute;
