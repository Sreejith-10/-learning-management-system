import express from "express";
import {addNewReview} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/new-review", addNewReview);

export {router as ReviewRouter};
