import mongoose from "mongoose";
import CourseModel from "../models/courseModel.js";
import UserModel from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
	try {
		const users = await UserModel.find();
		if (users) return res.status(200).json({users});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "Something went wrong"});
	}
};

export const getUserData = async (req, res) => {
	try {
		const {id} = req.body;

		const user = await UserModel.findOne({userId: id});
		if (user) {
			return res.status(200).json({user: user});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "Something went wrong"});
	}
};

export const getSingleUser = async (req, res) => {
	try {
		const id = req.params.id;

		const user = await UserModel.findOne({userId: id});
		if (user) {
			return res.status(200).json({user: user});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "Something went wrong"});
	}
};

export const updateWorkPreference = async (req, res) => {
	try {
		const {workPreferenceData, id} = req.body;

		const data = {
			role: workPreferenceData.role,
			industry: workPreferenceData.industry,
			workRemote: workPreferenceData.remote === "yes" ? true : false,
			relocate: workPreferenceData.relocation === "yes" ? true : false,
		};
		const user = await UserModel.findOneAndUpdate(
			{userId: id},
			{
				$set: {
					workPreference: data,
				},
			}
		);
		if (user) {
			return res.status(200).json({message: "Updated", user: user});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "Something went wrong"});
	}
};

export const updateWorkExperience = async (req, res) => {
	try {
		const {formData, id} = req.body;
		const data = {
			role: formData.role,
			company: formData.company,
			startYear: formData.startYear,
			startMonth: formData.startMonth,
			endYear: formData.endYear,
			endMonth: formData.endMonth,
			currentlyWorking: formData.currentlyWorking ? true : false,
			description: formData.description,
		};
		await UserModel.findOneAndUpdate(
			{userId: id},
			{$push: {workExperience: data}}
		);
		const user = await UserModel.findOne({userId: id});
		if (user) {
			return res.status(200).json({message: "Updated", user: user});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "Something went wrong"});
	}
};

export const editWorkExperience = async (req, res) => {
	try {
		const {formData, id, userId} = req.body;

		await UserModel.findOneAndUpdate(
			{userId: userId, "workExperience._id": id},
			{$set: {workExperience: formData}}
		);
		const user = await UserModel.findOne({userId: userId});
		if (user) {
			return res.status(200).json({message: "Updated", user: user});
		}
	} catch (error) {
		return res
			.status(500)
			.json({message: "Something went wrong", error: error});
	}
};

export const removeWorkExperience = async (req, res) => {
	try {
		const id = req.params.id;
		const userId = req.params.userId;

		await UserModel.findOneAndUpdate(
			{userId: userId},
			{$pull: {workExperience: {_id: id}}}
		);
		const user = await UserModel.findOne({userId: userId});
		if (user) {
			return res.status(200).json({message: "Updated", user: user});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "Something went wrong"});
	}
};

export const updateUserEducation = async (req, res) => {
	try {
		const {formData, id} = req.body;
		const data = {
			institute: formData.institute,
			qualification: formData.qualification,
			startYear: formData.startYear,
			startMonth: formData.startMonth,
			endYear: formData.endYear,
			endMonth: formData.endMonth,
			currentlyStudying: formData.currentlyStudying ? true : false,
		};
		await UserModel.findOneAndUpdate({userId: id}, {$push: {education: data}});
		const user = await UserModel.findOne({userId: id});
		if (user) {
			return res.status(200).json({message: "Updated", user: user});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "Something went wrong"});
	}
};

export const editUserEducation = async (req, res) => {
	try {
		const {formData, id, userId} = req.body;

		await UserModel.findOneAndUpdate(
			{userId: userId, "education._id": id},
			{$set: {"education.$": formData}}
		);
		const user = await UserModel.findOne({userId: userId});
		if (user) {
			return res.status(200).json({message: "Updated", user: user});
		}
	} catch (error) {
		return res
			.status(500)
			.json({message: "Something went wrong", error: error});
	}
};

export const removeUserEducation = async (req, res) => {
	try {
		const id = req.params.id;
		const userId = req.params.userId;

		await UserModel.findOneAndUpdate(
			{userId: userId},
			{$pull: {education: {_id: id}}}
		);
		const user = await UserModel.findOne({userId: userId});
		if (user) {
			return res.status(200).json({message: "Updated", user: user});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "Something went wrong"});
	}
};

export const updateCourseProgress = async (req, res) => {
	try {
		const ObjectId = mongoose.Types.ObjectId;
		const {userId, courseId, sessionId} = req.body;

		const user = await UserModel.findOne({userId: userId});
		if (!user) {
			return res.status(404).json({message: "User not found"});
		}

		const course = await CourseModel.findById(courseId);
		if (!course) {
			return res.status(404).json({message: "Course not found"});
		}

		const is = user.courses
			.filter((item) => item.courseId === courseId)
			.some((item) => item.sessionsCompleted.includes(sessionId));

		if (!is) {
			const singleCourse = user.courses.find(
				(item) => item.courseId === courseId
			);
			let count = 0;
			let len = course.sessions.length;
			count = 100 / len;

			singleCourse.progress += count;
			if (!singleCourse.sessionsCompleted.includes(sessionId))
				singleCourse.sessionsCompleted.push(sessionId);

			if (singleCourse.progress === 100) {
				singleCourse.status = "Completed";
			}

			await user.save();

			const u = await UserModel.findOne({userId: userId});
			return res.status(200).json({message: "Session Completed", user: u});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "Something went wrong"});
	}
};
