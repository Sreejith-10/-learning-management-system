import dotenv from "dotenv";
import CourseModel from "../models/courseModel.js";
import ReviewModel from "../models/reviewModel.js";

dotenv.config();

export const addNewCourse = async (req, res) => {
	try {
		const {
			courseName,
			courseDescription,
			courseDuration,
			courseInstructor,
			courseLevel,
			coursePrice,
			sessions,
			topics,
			skillsGain,
			startDate,
			endDate,
		} = req.body;

		const thumbnail = req.file;

		const course = await CourseModel.create({
			courseName,
			courseDescription,
			courseDuration,
			courseInstructor,
			courseLevel,
			coursePrice,
			thumbnail: thumbnail ? thumbnail.filename : "",
			sessions,
			topics,
			skillsGain,
			startDate,
			endDate,
		});

		await ReviewModel.create({courseId: course._id});

		if (course) return res.status(201).json({message: "New Course Created"});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "Something went wrong"});
	}
};

export const getCourses = async (req, res) => {
	try {
		const courseList = await CourseModel.find();
		if (courseList) {
			return res.status(200).json({course: courseList});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "Something went wrong"});
	}
};

export const getCourseById = async (req, res) => {
	try {
		const {courseId} = req.params;

		const singleCourse = await CourseModel.findOne({_id: courseId});

		if (!singleCourse) {
			return res.status(400).json({message: "Course not found"});
		}
		return res
			.status(200)
			.json({message: "Course Found", course: singleCourse});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "Something went wrong"});
	}
};

export const deletCourse = async (req, res) => {
	try {
		const id = req.params.id;

		await CourseModel.findByIdAndDelete(id);
		const course = await CourseModel.find();
		return res.status(200).json({data: course});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "Something went wrong"});
	}
};

export const updateCourse = async (req, res) => {
	try {
		const {formData} = req.body;

		const {
			courseName,
			courseDescription,
			courseDuration,
			courseInstructor,
			courseLevel,
			coursePrice,
			sessions,
			topics,
			endDate,
			startDate,
			skillsGain,
		} = formData;

		const {courseId} = req.body;

		await CourseModel.findByIdAndUpdate(
			{_id: courseId},
			{
				courseName,
				courseDescription,
				courseDuration,
				courseInstructor,
				courseLevel,
				coursePrice,
				sessions,
				topics,
				startDate,
				endDate,
				skillsGain,
			}
		);
		return res.status(200).json({message: `${courseName} is updated`});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "Something went wrong"});
	}
};
