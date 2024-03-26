import {useToast} from "@/components/ui/use-toast";
import {useAppSelector} from "@/redux";
import {setAuthenticated} from "@/redux/dashboardSlice";
import axios from "axios";
import {ReactNode, useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {useDispatch} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";

const ProtectedRoute = ({children}: {children: ReactNode}) => {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const nav = useNavigate();
	const {isAuthenticated} = useAppSelector((state) => state.dashboard);

	const [cookies, _setCookies] = useCookies();

	const {toast} = useToast();

	useEffect(() => {
		setLoading(true);
		axios
			.get("/auth/verify-user/" + cookies.token)
			.then(({data}) => {
				setLoading(false);
				dispatch(setAuthenticated(data.valid));
				nav("/dashboard");
			})
			.catch((_err) => {
				setLoading(false);
				toast({
					title: "Unauthorized",
					description: "You cannot access this route",
				});
			});
	}, []);

	return loading ? (
		<h1>Loading ... </h1>
	) : isAuthenticated ? (
		children
	) : (
		<Navigate to={"/"} />
	);
};

export default ProtectedRoute;
