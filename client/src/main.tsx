import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux/store.ts";
import {ThemeProvider} from "./components/theme-provider.tsx";
import {GoogleOAuthProvider} from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<GoogleOAuthProvider
			clientId={
				"138114947112-avmr8pj3vjra4r8tcgkjpcv2rl78d3va.apps.googleusercontent.com"
			}>
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
