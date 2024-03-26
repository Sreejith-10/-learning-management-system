export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type CourseType = {
	_id: string;
	courseName: string;
	courseDescription: string;
	courseDuration: number;
	courseInstructor: string;
	thumbnail: string | undefined;
	courseLevel: "beginner" | "ametuer" | "intermediate" | "expert";
	skillsGain: string[];
	topics: string[];
	coursePrice: number;
	startDate: string;
	endDate: string;
	sessions: {
		_id: string;
		sessionTitle: string;
		sessionDescription: string;
		sessionDuration: number;
		sessionTopics: {
			topicTitle: string;
			topicVideo: string;
		}[];
	}[];
};

export type InstructorType = {
	_id: string;
	fname: string;
	lname: string;
	age: number;
	experience: number;
	qualification: string;
	institute: string;
	role: string;
	profileImage: string;
};

export type UserType = {
	userId: string;
	userEmail: string;
	userName: string;
	profileImage:string;
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
	}[];
	education: {
		institute: string;
		qualification: string;
		startYear: string;
		startMonth: string;
		endYear: string;
		endMonth: string;
		currentlyStudying: boolean;
	}[];
	courses: {
		progress: number;
		courseId: string;
		buyingDate: string;
		status: "Started" | "Continuing" | "Completed" | "Expired";
	}[];
};
