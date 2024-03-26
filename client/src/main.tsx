import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux/store.ts";
import {ThemeProvider} from "./components/theme-provider.tsx";
import {GoogleOAuthProvider} from "@react-oauth/google";

const id = process.env.REACT_GOOGLE_SECRET
	? process.env.REACT_GOOGLE_SECRET
	: "";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<GoogleOAuthProvider clientId={id}>
			<Provider store={store}>
				<BrowserRouter>
					<ThemeProvider>
						<App />
					</ThemeProvider>
				</BrowserRouter>
			</Provider>
		</GoogleOAuthProvider>
	</React.StrictMode>
);
