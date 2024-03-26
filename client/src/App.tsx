import "./App.css";
import axios from "axios";
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {useAppDispatch} from "./redux";
import {setAuth, updateUser} from "./redux/authSlice";
import PageRoute from "./routes/PageRoute";
import {Toaster} from "./components/ui/toaster";

function App() {
	axios.defaults.baseURL = "http://localhost:8080";
	axios.defaults.withCredentials = true;

	const [cookies, _setCookies] = useCookies();
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const checkAuthenticated = async () => {
			const token = cookies.token;
			if (token) {
				try {
					setLoading(true);
					const {data} = await axios.post("/auth/verifyToken", {
						token,
					});
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
					}
					dispatch(setAuth(data.valid));
				} catch (error) {
					setLoading(false);
					console.log(error);
				}
			}
		};

		checkAuthenticated();
	}, [cookies.token]);

	return loading ? (
		<div>"loadingg .."</div>
	) : (
		<div className="w-full h-auto">
			<Toaster />
			<PageRoute />
		</div>
	);
}

export default App;
