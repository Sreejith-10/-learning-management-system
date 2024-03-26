import express from "express";
import {
	addNewCourse,
	getCourseById,
	getCourses,
	deletCourse,
	updateCourse,
} from "../controllers/courseController.js";
import {upload} from "../middlewares/muilterUploader.js";

const router = express.Router();

router.get("/get-courses", getCourses);
router.get("/get-single-course/:courseId", getCourseById);
router.post("/add-course", upload.single("thumbnail"), addNewCourse);
router.patch("/update-course", updateCourse);
router.delete("/delete-course/:id", deletCourse);

export {router as CourseRouter};
