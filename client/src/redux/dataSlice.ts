import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type PublicType = {
    _id:string,
    companies:string[],
    jobRoles:string[],
    industry:string[],
	qualification:string[],
	institute:string[]
}

const INITIAL_STATE= {
	publicData: {
		_id: "",
		companies: [""],
		jobRoles: [""],
        industry:[""],
		qualification:[""],
		institute:[""]
	},
};

const dataSlice = createSlice({
	name: "data",
	initialState: INITIAL_STATE,
	reducers: {
		updateData: (state, action: PayloadAction<PublicType>) => {
			state.publicData = action.payload;
		},
	},
});

export const {updateData} = dataSlice.actions;

export default dataSlice.reducer;
