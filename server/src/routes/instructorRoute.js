import express from "express";
import {
	createInstructor,
	getAllInstructor,
	getSingleInstructor,
	removeInstructor,
	updateInstructor,
} from "../controllers/instructorController.js";
import {upload} from "../middlewares/muilterUploader.js";

const router = express.Router();

router.get("/get-instructors", getAllInstructor);
router.get("/single-instructor/:id", getSingleInstructor);
router.post(
	"/create-instructor",
	upload.single("profileImage"),
	createInstructor
);
router.patch(
	"/update-instructor",
	upload.single("profileImage"),
	updateInstructor
);
router.delete("/remove-instructor/:id", removeInstructor);

export {router as InstructorRouter};
