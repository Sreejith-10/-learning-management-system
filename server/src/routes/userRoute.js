import express from "express";
import {
	editUserEducation,
	editWorkExperience,
	getAllUsers,
	getSingleUser,
	getUserData,
	removeUserEducation,
	removeWorkExperience,
	updateCourseProgress,
	updateUserEducation,
	updateWorkExperience,
	updateWorkPreference,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/get-users", getAllUsers);
router.get("/single-user/:id", getSingleUser);
router.post("/get-user", getUserData);
router.post("/update-workpreference", updateWorkPreference);
router.post("/update-workexperience", updateWorkExperience);
router.post("/update-education", updateUserEducation);
router.post("/update-course-progress", updateCourseProgress);
router.patch("/edit-education", editUserEducation);
router.patch("/edit-workexperience", editWorkExperience);
router.delete("/remove-experience/:id&:userId", removeWorkExperience);
router.delete("/remove-education/:id&:userId", removeUserEducation);

export {router as UserRoter};
