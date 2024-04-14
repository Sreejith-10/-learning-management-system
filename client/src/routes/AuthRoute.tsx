import {useAppSelector} from "@/redux";
import {useEffect, useState} from "react";
import {Navigate, Outlet} from "react-router";

const AuthRoute = () => {
	const {isLogged} = useAppSelector((state) => state.auth);

	const [user, setUser] = useState(false);

	useEffect(() => {
		const checkLogged = () => {
			const data = localStorage.getItem("logged");
			if (data) {
				return setUser(true);
			}
		};

		checkLogged();
	}, []);

	if (!user) {
		return "loadding";
	}

	return isLogged ? <Outlet /> : <Navigate to={"/login"} />;
};

export default AuthRoute;
