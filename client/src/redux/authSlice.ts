import {PayloadAction, createSlice} from "@reduxjs/toolkit";

type IsLog = boolean;
type UserType = {
	userId: string;
	userEmail: string;
	userName: string;
	profileImage:string,
	workPreference: {
		role: string;
		industry: string;
		workRemote: boolean;
		relocate: boolean;
	};
	workExperience: {
		role: string;
		company: string;
		startYear: string;
		startMonth: string;
		endYear: string;
		endMonth: string;
		currentlyWorking: boolean;
		description: string;
		_id: string;
	}[];
	education: {
		institute: string;
		qualification: string;
		startYear: string;
		startMonth: string;
		endYear: string;
		endMonth: string;
		currentlyStudying: boolean;
		_id: string;
	}[];
	courses: {
		courseId: string;
		buyingDate: string;
		status:"Started" | "Continuing" | "Completed" | "Expired";
		progress:number;
		sessionsCompleted:string[]
	}[];
};

type InitialStateType = {
	isLogged: IsLog;
	user: UserType;
	payment:any
};

const INITIAL_STATE: InitialStateType = {
	isLogged: false,
	user: {
		userId: "",
		userEmail: "",
		userName: "",
		profileImage:"",
		workPreference: {
			role: "",
			industry: "",
			workRemote: false,
			relocate: false,
		},
		workExperience: [
			{
				role: "",
				company: "",
				startYear: "",
				startMonth: "",
				endYear: "",
				endMonth: "",
				currentlyWorking: false,
				description: "",
				_id: "",
			},
		],
		education: [
			{
				institute: "",
				qualification: "",
				startYear: "",
				startMonth: "",
				endYear: "",
				endMonth: "",
				currentlyStudying: false,
				_id: "",
			},
		],
		courses:[
			{
				courseId:"",
				buyingDate:"",
				status:"Started",
				progress:0,
				sessionsCompleted:[""]
			}
		]
	},
	payment:""
};

const authSlice = createSlice({
	name: "auth",
	initialState: INITIAL_STATE,
	reducers: {
		setAuth: (state, action: PayloadAction<IsLog>) => {
			state.isLogged = action.payload;
		},
		updateUser: (state, action: PayloadAction<UserType>) => {
			state.user = action.payload;
		},
		updatePayment : (state,action:PayloadAction<any>)=>{
			state.payment = action.payload
		}
	},
});

export const {setAuth, updateUser, updatePayment} = authSlice.actions;

export default authSlice.reducer;
