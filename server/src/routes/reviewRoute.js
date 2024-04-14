import express from "express";
import {addNewReview, getReviewById} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/new-review", addNewReview);
router.get("/get-review/:id", getReviewById);

export {router as ReviewRouter};
