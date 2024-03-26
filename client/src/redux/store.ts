import authReducer from "./authSlice";
import courseReducer from "./courseSlice";
import {configureStore} from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import dashboradReducer from "./dashboardSlice"

export const store = configureStore({
	reducer: {
		auth: authReducer,
		course: courseReducer,
		data:dataReducer,
		dashboard:dashboradReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
