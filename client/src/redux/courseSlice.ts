import {CourseType} from "@/lib/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type INITIAL_STATE_TYPE = {
	searchKey: string;
	course: CourseType;
	userCourses:CourseType[]
};

const INITIAL_STATE: INITIAL_STATE_TYPE = {
	searchKey: "",
	course: {
		_id: "",
		courseName: "",
		courseDescription: "",
		courseDuration: 0,
		courseInstructor: "",
		courseLevel: "beginner",
		coursePrice: 0,
		thumbnail:"",
		startDate:"",
		endDate:"",
		sessions: [
			{
				_id:"",
				sessionDescription: "",
				sessionDuration: 0,
				sessionTitle: "",
				sessionTopics: [{_id:"",topicTitle: "", topicVideo: ""}],
			},
		],
		skillsGain: [""],
		topics: [""],
		studentsEnrolled:0
	},
	userCourses:[]
};

const courseSlice = createSlice({
	name: "course",
	initialState: INITIAL_STATE,
	reducers: {
		updateSearchKey: (state, action: PayloadAction<string>) => {
			state.searchKey = action.payload;
		},
		updateSingleCourse: (state, action: PayloadAction<CourseType>) => {
			state.course = action.payload;
		},
		updateUserCourses:(state,action:PayloadAction<CourseType[]>)=>{
			state.userCourses = action.payload
		}
	},
});

export const {updateSearchKey,updateSingleCourse,updateUserCourses} = courseSlice.actions;

export default courseSlice.reducer;
