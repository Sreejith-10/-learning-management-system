import {CourseType, InstructorType, UserType} from "@/lib/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type InitialStateType = {
	isAuthenticated : boolean;
	users: UserType[];
	courses: CourseType[];
	instructors: InstructorType[];
};

const INITIAL_STATE: InitialStateType = {
	isAuthenticated:false,
	courses: [
		{
			_id: "",
			courseName: "",
			courseDescription: "",
			courseDuration: 0,
			courseInstructor: "",
			courseLevel: "beginner",
			coursePrice: 0,
			sessions: [
				{
					_id:"",
					sessionTitle: "",
					sessionDescription: "",
					sessionDuration: 0,
					sessionTopics: [
						{
							_id:"",
							topicTitle: "",
							topicVideo: "",
						},
					],
				},
			],
			skillsGain: [""],
			topics:[""],
			startDate:"",
			endDate:"",
			studentsEnrolled:0,
			thumbnail:""
		},
	],
	users: [
		{
			userId: "",
			userEmail: "",
			userName: "",
			profileImage:"",
			courses: [{courseId: "", buyingDate: "",status:"Started",progress:0}],
			education: [
				{
					institute: "",
					qualification: "",
					currentlyStudying: false,
					endMonth: "",
					startYear: "",
					endYear: "",
					startMonth: "",
				},
			],
			workPreference: {
				workRemote: false,
				role: "",
				industry: "",
				relocate: false,
			},
			workExperience: [
				{
					company: "",
					currentlyWorking: false,
					description: "",
					role: "",
					endMonth: "",
					startYear: "",
					endYear: "",
					startMonth: "",
				},
			],
		},
	],
	instructors: [
		{
			_id: "",
			fname: "",
			lname: "",
			age: 0,
			experience: 0,
			institute: "",
			qualification: "",
			role: "",
			profileImage:""
		},
	],
};

const dashboardSlice = createSlice({
	name: "dashboard",
	initialState: INITIAL_STATE,
	reducers: {
		setAuthenticated : (state,action:PayloadAction<boolean>) =>{
			state.isAuthenticated = action.payload
		},
		updateUsers: (state, action: PayloadAction<UserType[]>) => {
			state.users = action.payload;
		},
		updateCourses: (state, action: PayloadAction<CourseType[]>) => {
			state.courses = action.payload;
		},
		updateInstructors: (state, action: PayloadAction<InstructorType[]>) => {
			state.instructors = action.payload;
		},
	},
});

export const {setAuthenticated,updateCourses,updateUsers,updateInstructors} = dashboardSlice.actions

export default dashboardSlice.reducer