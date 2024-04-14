import "./App.css";
import axios from "axios";
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {useAppDispatch} from "./redux";
import {setAuth, updateUser} from "./redux/authSlice";
import PageRoute from "./routes/PageRoute";
import {Toaster} from "./components/ui/toaster";
import Loader from "./components/ui/loader";

function App() {
	axios.defaults.baseURL = import.meta.env.VITE_API;
	axios.defaults.withCredentials = true;

	const [cookies, _setCookies] = useCookies();
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const checkAuthenticated = async () => {
			const token = cookies.token || localStorage.getItem("token");
			if (token) {
				try {
					setLoading(true);
					const {data} = await axios.post("/auth/verifyToken", {
						token,
					});
					if (data.user.role === "Admin") {
						return setLoading(false);
					}
					if (data) {
						const id = data.user._id;
						const user = await axios.post(
							"/user/get-user",
							{id},
							{
								headers: {
									"Content-Type": "application/json",
								},
							}
						);
						dispatch(updateUser(user.data.user));
						setLoading(false);
						localStorage.setItem("logged", JSON.stringify(user.data.user));
					}
					dispatch(setAuth(data.valid));
				} catch (error) {
					setLoading(false);
					console.log(error);
				}
			}
		};

		checkAuthenticated();

		return () => {
			localStorage.removeItem("token");
		};
	}, [cookies.token]);

	return loading ? (
		<Loader />
	) : (
		<div className="w-full h-auto">
			<Toaster />
			<PageRoute />
		</div>
	);
}

export default App;
