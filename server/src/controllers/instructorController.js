import dotenv from "dotenv";
import InstructorModel from "../models/InstructorModel.js";

dotenv.config();

export const getAllInstructor = async (req, res) => {
	try {
		const instructors = await InstructorModel.find();
		if (instructors) {
			return res.status(200).json({instructors});
		}
	} catch (error) {
		return res.status(500).json({message: "Something went wrong"});
	}
};

export const getSingleInstructor = async (req, res) => {
	try {
		const id = req.params.id;
		const instructor = await InstructorModel.findById(id);
		if (instructor) return res.status(200).json({instructor: instructor});
	} catch (error) {
		return res.status(500).json({message: "Something went wrong"});
		console.log(error);
	}
};

export const createInstructor = async (req, res) => {
	try {
		const {fname, lname, age, experience, qualification, institute, role} =
			req.body;

		const profileImage = req.file;

		const instructor = await InstructorModel.create({
			fname,
			lname,
			age: parseInt(age),
			experience: parseInt(experience),
			qualification,
			institute,
			role,
			profileImage: profileImage ? profileImage.filename : "",
		});
		if (instructor) {
			return res
				.status(201)
				.json({message: "New Instructor Added!", instructor});
		} else {
			throw new error();
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "Something went wrong"});
	}
};

export const updateInstructor = async (req, res) => {
	try {
		const {
			fname,
			lname,
			age,
			experience,
			qualification,
			institute,
			role,
			instructorId,
		} = req.body;

		const profileImage = req.file;

		const data = await InstructorModel.findOneAndUpdate(
			{_id: instructorId},
			{
				fname,
				lname,
				age,
				experience,
				qualification,
				institute,
				role,
				profileImage: profileImage && profileImage.filename,
			}
		);
		return res.status(200).json({message: "Instructor updated", data: data});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "Something went wrong"});
	}
};

export const removeInstructor = async (req, res) => {
	try {
		const id = req.params.id;
		await InstructorModel.findByIdAndDelete(id);

		return res.status(200).json({message: "Successfully removed"});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "Something went wrong"});
	}
};
